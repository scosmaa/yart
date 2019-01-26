pipeline {
    environment {
        PATH = "C:\\Program Files\\Git\\usr\\bin;C:\\Program Files\\Git\\bin;${env.PATH}"
    }
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
                sh 'call npm --version'
            }
        }
    }
    }
}