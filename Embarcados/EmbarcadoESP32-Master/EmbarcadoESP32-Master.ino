#include <esp_now.h>
#include <WiFi.h>
#include <Arduino.h>
#include <FirebaseESP32.h>
#include <time.h>
#include <esp_wifi.h>

//Credenciais de conexão com a Internet e com o Firebase
#define WIFI_SSID "Otavio"
#define WIFI_PASSWORD "$tav2025"
#define Web_API_KEY "AIzaSyAP4ZiS0AHTReVWpU-oX_eJ-60454x7zSU"
#define DATABASE_URL "https://projetotcc-espnow-default-rtdb.firebaseio.com/"
#define USER_EMAIL "camatavio@gmail.com"
#define USER_PASS "espnowfirebase"

//Componentes do Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig fconfig;

unsigned long ultimoTempoEnvio = 0;
const unsigned long intervaloEnvio = 10000;

//Configurações para armazenar a data e hora atual.
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = -3 * 3600;
const int daylightOffset_sec = 0;

//Variável para armazenamento das informações de pareamento.
esp_now_peer_info_t infoPareamento;

//Estrutura responsável por armazenar os dados recebidos pelos sensores dos protótipos.
typedef struct dados_prototipo{

  int id;
  int nivelAlto;
  int nivelMedio;
  int nivelBaixo;
 
} dados_prototipo;

//Estrutura criada para armazenar os dados da pinagem dos sensores locais.
typedef struct pinos_sensores{

  const int pinSensorAlto;
  const int pinSensorMedio;
  const int pinSensorBaixo;
  
} pinos_sensores;

//Variável responsável por armazenar os dados recebidos.
dados_prototipo dadosRecebidos;

//Declaração das variáveis referentes a cada um dos protótipos "Slave".
dados_prototipo slaveOne = {1,-1, -1, -1};
dados_prototipo slaveTwo = {2,-1, -1, -1};

//Declaração da variável para armazenar os dados recebidos pelo protótipo "Master".
dados_prototipo master;

//Declaração da "variável imutável" da pinagem referente ao protótipo "Master".
const pinos_sensores masterPin = {
  .pinSensorAlto = 33,
  .pinSensorMedio = 34,
  .pinSensorBaixo = 35
};

dados_prototipo esp[2] = {slaveOne, slaveTwo};

char macStr[18];

void onDataRecv(const uint8_t *mac, const uint8_t *entradaDados, int len){

  Serial.print("Pacote recebido de: ");
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]); 

  Serial.println(macStr);

  memcpy(&dadosRecebidos, entradaDados, sizeof(dadosRecebidos));

  //Atualiza a estrutura com os dados que estão sendo recebidos.
  esp[dadosRecebidos.id-1].id = dadosRecebidos.id;
  esp[dadosRecebidos.id-1].nivelAlto = dadosRecebidos.nivelAlto;
  esp[dadosRecebidos.id-1].nivelMedio = dadosRecebidos.nivelMedio;
  esp[dadosRecebidos.id-1].nivelBaixo = dadosRecebidos.nivelBaixo;
  
}

void setup() {

  Serial.begin(115200);

  //Definição de um id para o protótipo.
  master.id = 0;

  //Definição dos pinos dos sensores como receptores de dados
  pinMode(masterPin.pinSensorAlto, INPUT);
  pinMode(masterPin.pinSensorMedio, INPUT);
  pinMode(masterPin.pinSensorBaixo, INPUT);

  //Conexão com o WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando à rede");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();

  //Definição do dispositivo como Wi-Fi Station.
  WiFi.mode(WIFI_STA);

  //Configuração da data e do horário
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  struct tm timeInfo;
  while (!getLocalTime(&timeInfo)) {
    Serial.println("Falha ao obter a hora. Tentando novamente...");
    delay(1000);
  }
  Serial.println("Hora sincronizada com sucesso!");

  Firebase.reconnectWiFi(true);

  Firebase.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
  if (Firebase.ready()){
    Serial.println("Autenticação com Conta de Serviço bem-sucedida.");
  }
  else{
    Serial.printf("Falha na autenticação: %s\n", fconfig.signer.tokens.error.message.c_str());
  }

  //Inicialização do protocolo ESP-NOW.
  if(esp_now_init() != ESP_OK){

    Serial.println("Erro ao inicializar o protocolo ESP-NOW");
    return;

  }

  fconfig.api_key = Web_API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASS;

  fconfig.database_url = DATABASE_URL;

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  Firebase.begin(&fconfig, &auth);

  //Função para registro de callback a partir da função de recebimento de dados.
  esp_now_register_recv_cb(esp_now_recv_cb_t(onDataRecv));

  //Cópia e definição das informações de pareamento.
  memcpy(infoPareamento.peer_addr, macStr, 6);
  infoPareamento.channel = 0;
  infoPareamento.encrypt = false;

  //Condicional para verificação de sucesso na adição de pareamento.
  if (esp_now_add_peer(&infoPareamento) != ESP_OK){
    Serial.println("Falha ao realizar o pareamento");
    return;
  }
  
  delay(10000);

}

void loop() {

  //Definição da variável "Master" a partir das leituras de portas analógicas.
  master.nivelAlto = map(analogRead(masterPin.pinSensorAlto), 4095, 0, 0, 100);
  master.nivelMedio = map(analogRead(masterPin.pinSensorMedio), 4095, 0, 0, 100);
  master.nivelBaixo = map(analogRead(masterPin.pinSensorBaixo), 4095, 0, 0, 100);
  
  //Verificação da conexão com o Firebase
  if(Firebase.ready()){

    //Armazenamento do valor atual de tempo
    unsigned long tempoAtual = millis();

    if(tempoAtual - ultimoTempoEnvio >= intervaloEnvio){

      ultimoTempoEnvio = tempoAtual;
      
      //Configuração para obter as informações de data e hora
      struct tm timeinfo;
      if (!getLocalTime(&timeinfo)) {
        Serial.println("Falha ao obter a hora local!");
        return;
      }
      //Formatação da data e hora;
      char dataAtual[11];
      strftime(dataAtual, sizeof(dataAtual), "%Y-%m-%d", &timeinfo);
      char horaAtual[9];
      strftime(horaAtual, sizeof(horaAtual), "%H:%M:%S", &timeinfo);

      //Criação de um objeto .json para o envio de dados.
      FirebaseJson json;

      //Adição dos dados do "Master" ao arquivo .json.
      json.set("master/nivelAlto", master.nivelAlto);
      json.set("master/nivelMedio", master.nivelMedio);
      json.set("master/nivelBaixo", master.nivelBaixo);

      //Adição dos dados dos "Slaves" ao arquivo .json.
      for(int i = 0; i < 2; i++){

        String slavePath = "slave_" + String(i+1);
        json.set(slavePath + "/nivelAlto", esp[i].nivelAlto);
        json.set(slavePath + "/nivelMedio", esp[i].nivelMedio);
        json.set(slavePath + "/nivelBaixo", esp[i].nivelBaixo);
        
      }

      //Caminho dinâmico utilizando as informações de data e hora.
      String path = "/registros/" + String(dataAtual)+ "/" + String(horaAtual) + "/tipo";

      if (Firebase.setJSON(fbdo, path.c_str(), json)) {
        Serial.println(">>> SUCESSO: Dados enviados para o Realtime Database.");
      } else {
        Serial.println(">>> FALHA: Não foi possível enviar os dados.");
        Serial.println("RAZÃO: " + fbdo.errorReason());
      }
    }
  }
  delay(30000);  
}
