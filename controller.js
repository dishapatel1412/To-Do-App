var app = angular.module('todoApp', []);

app.controller('taskCtrl', function($scope, $http) {
    $scope.tasks = [];
    $scope.newTask = {};
    $scope.editingTask = null;

    // Load tasks
    $http.get('/api/tasks').then(function(response) {
        $scope.tasks = response.data;
    });

    // Add task
    $scope.addTask = function() {
        if (!$scope.newTask.title) {
            alert('Task title is required!');
            return;
        }
        $http.post('/api/tasks', $scope.newTask).then(function(response) {
            $scope.tasks.push(response.data);
            $scope.newTask = {};
        });
    };

    // Toggle complete
    $scope.toggleComplete = function(task) {
        if (task.completed) {
            alert('Task is already completed!');
            return;
        }
        task.completed = !task.completed;
        $http.put('/api/tasks/' + task._id, task);
    };

    // Edit task
    $scope.editTask = function(task) {
        $scope.editingTask = angular.copy(task);
    };

    // Update task
    $scope.updateTask = function() {
        $http.put('/api/tasks/' + $scope.editingTask._id, $scope.editingTask).then(function(response) {
            var index = $scope.tasks.findIndex(t => t._id === $scope.editingTask._id);
            $scope.tasks[index] = response.data;
            $scope.editingTask = null;
        });
    };

    // Cancel edit
    $scope.cancelEdit = function() {
        $scope.editingTask = null;
    };

    // Delete task
    $scope.deleteTask = function(id) {
        $http.delete('/api/tasks/' + id).then(function(response) {
            $scope.tasks = $scope.tasks.filter(task => task._id !== id);
        });
    };
});
