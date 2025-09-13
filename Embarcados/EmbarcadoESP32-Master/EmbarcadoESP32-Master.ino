#include <esp_now.h>
#include <WiFi.h>

//Estrutura responsável por armazenar os dados recebidos pelos sensores dos protótipos
typedef struct medida_sensores{

  int id;
  int nivelAlto;
  int nivelMedio;
  int nivelBaixo;
 
} medida_sensores;

//Variável responsável por armazenar os dados recebidos
medida_sensores dadosRecebidos;

//Declaração das variáveis referentes a cada um dos protótipos "Slave"
medida_sensores slaveOne;
medida_sensores slaveTwo;

medida_sensores esp[2] = {slaveOne, slaveTwo};

void setup() {

  Serial.begin(115200);

  //Definição do dispositivo como Wi-Fi Station
  WiFi.mode(WIFI_STA);

  //Inicialização do protocolo ESP-NOW
  if(esp_now_init() != ESP_OK){

    Serial.println("Erro ao inicializar o protocolo ESP-NOW");
    return;

  }

  esp_now_register_recv_cb(esp_now_recv_cb_t(onDataRecv));
  

}

void loop() {
  
}

void onDataRecv(const uint8_t * mac, const uint8_t *entradaDados, int len){

  char macStr[18];

  Serial.print("Pacote recebido do endereço ");
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]); 

  memcpy(&dadosRecebidos, entradaDados, sizeof(dadosRecebidos));

  //Atualiza a estrutura com os dados que estão sendo recebidos
  esp[dadosRecebidos.id-1].nivelAlto = dadosRecebidos.nivelAlto;
  esp[dadosRecebidos.id-1].nivelMedio = dadosRecebidos.nivelMedio;
  esp[dadosRecebidos.id-1].nivelBaixo = dadosRecebidos.nivelBaixo;
  
}
