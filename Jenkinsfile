pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'thormesfap/mentorr-frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        WORKLOAD = 'frontend-live'
        CONTAINER = 'frontend-live'
    }
    
    stages {
        stage('Build') {
            steps {
                script{
                    dockerapp = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        stage('Registry'){
            steps{
                script{
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub'){
                        dockerapp.push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker exec \$(docker ps -q) kubectl set image deployment/\${WORKLOAD} \${CONTAINER}=\${DOCKER_IMAGE}:\${DOCKER_TAG} -n default
                '''
            }
        }
    }
}
