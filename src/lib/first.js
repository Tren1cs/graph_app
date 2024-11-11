function find(mas, key) {
    for (var item in mas) {
        if (mas[item] == key)
            return true;
    }
    return false;
}
function graph_alignment(graph, vertex_pos, rebr_power, vertex_power, move_distance) {
    for (var vertex in graph) {
        var move_x = 0, move_y = 0;
        for (var other_vertex in graph) {
            var distance = void 0, distance_x = void 0, distance_y = void 0;
            distance = Math.sqrt(Math.pow(vertex_pos[vertex][0] - vertex_pos[other_vertex][0], 2) + Math.pow(vertex_pos[other_vertex][1] - vertex_pos[vertex][1], 2));
            distance_x = vertex_pos[other_vertex][0] - vertex_pos[vertex][0];
            distance_y = vertex_pos[other_vertex][1] - vertex_pos[vertex][1];
            if (vertex != other_vertex && find(graph[vertex], other_vertex)) {
                var conection_power = void 0;
                conection_power = Math.pow(distance, rebr_power);
                move_x += distance_x * conection_power * move_distance;
                move_y += distance_y * conection_power * move_distance;
            }
            var repulsion_power = void 0;
            if (vertex != other_vertex) {
                repulsion_power = vertex_power / distance;
                move_x -= distance_x * repulsion_power * move_distance;
                move_y -= distance_y * repulsion_power * move_distance;
            }
        }
        vertex_pos[vertex][0] += move_x;
        vertex_pos[vertex][1] += move_y;
    }
    return vertex_pos;
}
function get_vertex_positions(rebrs) {
    //*константы
    var iteration_times = 1000000; //? количество итераций
    var rebr_power = 1.1; //? сила притяжения между вершинами ребра (distance ^ rebr_power)
    var vertex_power = 1000; //? сила отталкивания между двумя вершинами (vertex_power / distance)
    var move_distance = 0.0000001; //? сила одного шага (... * move_distance)
    var min_start_pos_range = 0; //? минимальная стартовая координата вершины
    var max_start_pos_range = 1000; //? максимальная стартовая координата вершины
    //* конвертация входных данных
    console.log(rebrs);
    var graph = {};
    rebrs.forEach(function (rebro) {
        console.log(rebro);
        if (!graph[rebro[0]])
            graph[rebro[0]] = [];
        if (!graph[rebro[1]])
            graph[rebro[1]] = [];
        graph[rebro[0]].push(rebro[1]);
        graph[rebro[1]].push(rebro[0]);
    });
    console.log(graph);
    //! дальше бога нет...
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var vertex_pos = {};
    for (var vertex in graph) {
        vertex_pos[vertex] = [randomIntFromInterval(min_start_pos_range, max_start_pos_range), randomIntFromInterval(min_start_pos_range, max_start_pos_range)];
    }
    console.log(vertex_pos);
    //! ну тут ещё был, дальше его точно нет, ведь теперь ИЗМЕНЕНИЕ РАСПОЛОЖЕНИЯ
    for (var i = 0; i < iteration_times; i++) {
        vertex_pos = graph_alignment(graph, vertex_pos, rebr_power, vertex_power, move_distance);
    }
    console.log(vertex_pos);
    //! бог есть, возвращаю координаты (ключ: имя вершины; значание - Array из двух значений (x и y)), 
    //* { [id: string]: Array<number> }
    return vertex_pos;
}
var rebrs = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
];
get_vertex_positions(rebrs);
