pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'npm i'
                bat 'npm run build'
            }
        }
    }
}