function find(mas: Array<string>, key: string){
    for(let item in mas){
        if(mas[item] == key) return true;
    }
    return false;
}

function graph_alignment(graph: { [id: string] : Array<string>}, vertex_pos: { [id: string]: Array<number> }, rebr_power: number, vertex_power: number, move_distance: number){
    for(let vertex in graph){
        let move_x: number = 0, move_y: number = 0;
        for(let other_vertex in graph){
            let distance: number, distance_x: number, distance_y: number;
            distance = Math.sqrt(Math.pow(vertex_pos[vertex][0] - vertex_pos[other_vertex][0], 2) + Math.pow(vertex_pos[other_vertex][1] - vertex_pos[vertex][1], 2));
            distance_x = vertex_pos[other_vertex][0] - vertex_pos[vertex][0];
            distance_y = vertex_pos[other_vertex][1] - vertex_pos[vertex][1];
            if(vertex != other_vertex && find(graph[vertex], other_vertex)){
                let conection_power: number;
                conection_power = Math.pow(distance, rebr_power);
                move_x += distance_x * conection_power * move_distance;
                move_y += distance_y * conection_power * move_distance;
            }
            let repulsion_power: number;
            if(vertex != other_vertex){
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


export function get_vertex_positions(rebrs: Array<Array<string>>){

    //*константы

    const iteration_times: number = 1000000;   //? количество итераций
    const rebr_power: number = 1.1;            //? сила притяжения между вершинами ребра (distance ^ rebr_power)
    const vertex_power: number = 1000;         //? сила отталкивания между двумя вершинами (vertex_power / distance)
    const move_distance: number = 0.0000001;   //? сила одного шага (... * move_distance)
    const min_start_pos_range: number = 0;     //? минимальная стартовая координата вершины
    const max_start_pos_range: number = 1000;  //? максимальная стартовая координата вершины

    //* конвертация входных данных

    console.log(rebrs);
    let graph: { [id: string] : Array<string>} = {};                              
    rebrs.forEach(function (rebro) {
        console.log(rebro);
        if(!graph[rebro[0]]) graph[rebro[0]] = [];   
        if(!graph[rebro[1]]) graph[rebro[1]] = [];              
        graph[rebro[0]].push(rebro[1]);
        graph[rebro[1]].push(rebro[0]);
    });
    console.log(graph);



    //! дальше бога нет...

    function randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    let vertex_pos: { [id: string]: Array<number> } = {};
    for(let vertex in graph) {
        vertex_pos[vertex] = [randomIntFromInterval(min_start_pos_range, max_start_pos_range), randomIntFromInterval(min_start_pos_range, max_start_pos_range)];
    }
    console.log(vertex_pos);



    //! ну тут ещё был, дальше его точно нет, ведь теперь ИЗМЕНЕНИЕ РАСПОЛОЖЕНИЯ

    for(let i = 0; i < iteration_times; i++){
        vertex_pos = graph_alignment(graph, vertex_pos, rebr_power, vertex_power, move_distance);
    }
    console.log(vertex_pos);

    
    //! бог есть, возвращаю координаты (ключ: имя вершины; значание - Array из двух значений (x и y)), 
    //* { [id: string]: Array<number> }
    let convertedVertexPos:{id:string, x:number, y:number}[] = [];
    for(let vertex in vertex_pos){
        convertedVertexPos.push({id: vertex, x: vertex_pos[vertex][0], y: vertex_pos[vertex][1]});
        console.log(convertedVertexPos);
    }
    
    return convertedVertexPos;
}