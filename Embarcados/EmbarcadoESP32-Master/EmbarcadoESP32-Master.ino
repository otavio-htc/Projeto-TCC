#define ENABLE_USER_AUTH
#define ENABLE_DATABASE

#include <esp_now.h>
#include <WiFi.h>
#include <Arduino.h>
#include <WiFiClientSecure.h>
#include <FirebaseClient.h>
#include <FirebaseJson.h>
#include <time.h>

//Credenciais de conexão com a Internet e com o Firebase
#define WIFI_SSID "Otavio"
#define WIFI_PASSWORD "$tav2025"
#define Web_API_KEY "AIzaSyAP4ZiS0AHTReVWpU-oX_eJ-60454x7zSU"
#define DATABASE_URL "https://projetotcc-espnow-default-rtdb.firebaseio.com/"
#define USER_EMAIL "camatavio@gmail.com"
#define USER_PASS "espnowfirebase"

//Processamento de dados
void processarDados(AsyncResult &aResult);

//Autenticação
UserAuth user_auth(Web_API_KEY, USER_EMAIL, USER_PASS);

//Componentes do Firebase
FirebaseApp app;
WiFiClientSecure ssl_client;
using AsyncClient = AsyncClientClass;
AsyncClient aClient(ssl_client);
RealtimeDatabase Database;

unsigned long ultimoTempoEnvio = 0;
const unsigned long intervaloEnvio = 10000;

//Configurações para armazenar a data e hora atual.
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = -3 * 3600;
const int daylightOffset_sec = 0;

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
dados_prototipo slaveOne;
dados_prototipo slaveTwo;

//Declaração da variável para armazenar os dados recebidos pelo protótipo "Master".
dados_prototipo master;

//Declaração da "variável imutável" da pinagem referente ao protótipo "Master".
const pinos_sensores masterPin = {
  .pinSensorAlto = 33,
  .pinSensorMedio = 34,
  .pinSensorBaixo = 35
};

dados_prototipo esp[2] = {slaveOne, slaveTwo};

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

  //Inicialização do protocolo ESP-NOW.
  if(esp_now_init() != ESP_OK){

    Serial.println("Erro ao inicializar o protocolo ESP-NOW");
    return;

  }

  //Configuração da data e do horário
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  struct tm timeInfo;
  while (!getLocalTime(&timeInfo)) {
    Serial.println("Falha ao obter a hora. Tentando novamente...");
    delay(1000);
  }
  Serial.println("Hora sincronizada com sucesso!");

  //Configuração do cliente SSL
  ssl_client.setInsecure();
  ssl_client.setConnectionTimeout(1000);
  ssl_client.setHandshakeTimeout(5);

  //Inicialização do Firebase
  initializeApp(aClient, app, getAuth(user_auth), processarDados, "🔐 authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url(DATABASE_URL);

  //Função para registro de callback a partir da função de recebimento de dados.
  esp_now_register_recv_cb(esp_now_recv_cb_t(onDataRecv));
  

}

void loop() {

  //Definição da variável "Master" a partir das leituras de portas analógicas.
  master.nivelAlto = analogRead(masterPin.pinSensorAlto);
  master.nivelMedio = analogRead(masterPin.pinSensorMedio);
  master.nivelBaixo = analogRead(masterPin.pinSensorBaixo);

  //Para manter a autenticação e as tarefas assíncronas 
  app.loop();

  //Verificação da conexão com o Firebase
  if(app.ready()){

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
      char dataHora[20];
      strftime(dataHora, sizeof(dataHora), "%Y-%m-%d_%H-%M-%S", &timeinfo);

      
      //Criação de um objeto .json para o envio de dados.
      FirebaseJson json;

      //Adição dos dados do "Master" ao arquivo .json.
      json.set("master/nivelAlto", master.nivelAlto);
      json.set("master/nivelMedio", master.nivelMedio);
      json.set("master/nivelBaixo", master.nivelBaixo);

      //Adição dos dados dos "Slaves" ao arquivo .json.
      for(int i = 0; i < 2; i++){

        String slavePath = "slave_" + esp[i].id;
        json.set(slavePath + "/nivelAlto", esp[i].nivelAlto);
        json.set(slavePath + "/nivelMedio", esp[i].nivelMedio);
        json.set(slavePath + "/nivelBaixo", esp[i].nivelBaixo);
        
      }

      //Caminho dinâmico utilizando as informações de data e hora.
      String path = "/" + String(dataHora) + "/tipo";

      Serial.println("Enviando dados para o Firebase...");
      Serial.println("Caminho: " + path);
      json.toString(Serial, true);
      Serial.println();

      //Criação de uma "string" para armazenar o arquivo ".json".
      String jsonString;
      json.toString(jsonString, true);

      //Envio do arquivo para o Firebase.
      Database.set(aClient, path, jsonString);   
      
    }
    
  }

  delay(500);
  
}

void onDataRecv(const uint8_t * mac, const uint8_t *entradaDados, int len){

  char macStr[18];

  Serial.print("Pacote recebido de: ");
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]); 

  memcpy(&dadosRecebidos, entradaDados, sizeof(dadosRecebidos));

  //Atualiza a estrutura com os dados que estão sendo recebidos.
  esp[dadosRecebidos.id-1].nivelAlto = dadosRecebidos.nivelAlto;
  esp[dadosRecebidos.id-1].nivelMedio = dadosRecebidos.nivelMedio;
  esp[dadosRecebidos.id-1].nivelBaixo = dadosRecebidos.nivelBaixo;
  
}

//Função responsável por realizar um tratamento de erros a respeito do processamento de dados.
void processarDados(AsyncResult &aResult){

  if (!aResult.isResult()){
    return;
  }

  if (aResult.isEvent()){
    Firebase.printf("Event task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.eventLog().message().c_str(), aResult.eventLog().code());
  }

  if (aResult.isDebug()){
    Firebase.printf("Debug task: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());
  }

  if (aResult.isError()){
    Firebase.printf("Error task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());
  }

  if (aResult.available()){
    Firebase.printf("task: %s, payload: %s\n", aResult.uid().c_str(), aResult.c_str());
  }
  
}
