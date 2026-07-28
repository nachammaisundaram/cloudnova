pipeline {
    agent any

    environment {
        IMAGE_NAME = "cloudnova-site"
        CONTAINER_NAME = "cloudnova-container"
        HOST_PORT = "8081"
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
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Run Container') {
            steps {
                echo 'Stopping old container (if any) and starting a new one...'
                sh '''
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d --name $CONTAINER_NAME -p $HOST_PORT:80 $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying the container is running and responding...'
                sh '''
                    sleep 3
                    docker ps --filter "name=$CONTAINER_NAME"
                    curl -f http://localhost:$HOST_PORT || exit 1
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
