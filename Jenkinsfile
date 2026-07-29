pipeline {
    agent any

    environment {
            IMAGE_NAME = "cloudnova-site"
            CONTAINER_NAME = "cloudnova-container"
            HOST_PORT = "8081"
            DOCKER_HOST = "tcp://localhost:2375"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Cloning repository from GitHub...'
                git branch: 'main', url: 'https://github.com/nachammaisundaram/cloudnova.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .'
            }
        }

        stage('Run Container') {
            steps {
                echo 'Stopping old container (if any) and starting a new one...'
                bat '''
                    docker rm -f %CONTAINER_NAME%
                    docker run -d --name %CONTAINER_NAME% -p %HOST_PORT%:80 %IMAGE_NAME%:%BUILD_NUMBER%
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying the container is running and responding...'
                bat '''
                    timeout /t 3
                    docker ps --filter "name=%CONTAINER_NAME%"
                    curl -f http://localhost:%HOST_PORT%
                '''
            }
        }

        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                cleanWs()
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check console output above.'
        }
    }
}
