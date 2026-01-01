# 🦄 Pegasus Framework

Pegasus é um framework CLI poderoso que utiliza a estrutura robusta do **Angular** combinada com a versatilidade do **Capacitor** para criar aplicativos nativos para Android e iOS.

## 🚀 Instalação

Para utilizar o CLI globalmente, você pode instalá-lo via npm (estando na raiz do projeto):

```bash
npm install -g .
```

Ou utilizar diretamente via node sem instalar globalmente:

```bash
./bin/pegasus.js <comando>
```

## 🛠 Comandos Disponíveis

### Criar um Novo Projeto
Gera um novo projeto Angular + Capacitor configurado.

```bash
pegasus create <nome-do-projeto>
```

### Construir para Plataforma
Compila o projeto Angular e sincroniza com a plataforma nativa (Android/iOS).

```bash
cd <nome-do-projeto>
pegasus build android
pegasus build ios
```

### Gerar APK (Android)
Automatiza o processo de build do Gradle para gerar um APK de debug.

```bash
cd <nome-do-projeto>
pegasus apk
```
O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📋 Pré-requisitos
- Node.js & npm
- Git
- Android Studio (para builds Android)
- Xcode (para builds iOS - apenas macOS)

## 📚 Documentação
A documentação completa do framework é construída com o próprio Pegasus e está localizada na pasta `docs/`.

Para rodar a documentação localmente:
```bash
cd docs
npm install
npm run pegasus
```
(Selecione a opção **Web**)
