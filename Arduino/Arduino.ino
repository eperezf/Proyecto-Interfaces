int photoport = 0;
int photoread = 0;
String incomingByte;

void setup(){
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop(){
  photoread = analogRead(photoport);
  Serial.println(photoread);
  delay(100);
  incomingByte = Serial.readString();
  if (incomingByte != ""){
    if (incomingByte == "L0"){
      digitalWrite(13, LOW);
    }
    else {
      digitalWrite(13, HIGH);
    }
  }
}
