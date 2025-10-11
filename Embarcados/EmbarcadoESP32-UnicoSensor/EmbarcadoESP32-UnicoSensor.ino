const int pinSensor = 33;

void setup() {

    Serial.begin(115200);
    delay(1000);
    Serial.println("Iniciando leitura do sensor de umidade...");

}

void loop() {

  int leitura = analogRead(pinSensor);

  int umidadePercentual = map(leitura, 4095, 0, 0, 100);

  Serial.print("Leitura bruta: ");
  Serial.print(leitura);
  Serial.print(" | Umidade: ");
  Serial.print(umidadePercentual);
  Serial.println("%");

  delay(500);

}
