
function Deikstra(graph: { [id: string] : Array<string>}, pos: Array<string>){
    let timeline: Array<Array<string>> = [];
    let vis: { [id: string] : boolean} = {};
    let time: number = 0;
    let pos2: Array<string> = [];
    for(let vertex in graph){
        vis[vertex] = false;
    }
    for(let i = 0; i < pos.length; i++){
        vis[pos[i]] = true;
    }
    while(pos.length > 0){
        timeline.push([]);
        while(pos.length > 0){
            let vertex: string = pos[pos.length - 1];
            pos.pop();
            timeline[time].push(vertex);
            for(let j = 0; j < graph[vertex].length; j++){
                let neighbor: string = graph[vertex][j];
                if(vis[neighbor] == false){
                    pos2.push(neighbor);
                    vis[neighbor] = true;
                }
            }
        }
        while(pos2.length > 0){
            pos.push(pos2[pos2.length - 1]);
            pos2.pop();
        }
        time++;
    }
    return timeline;
}

let graph: { [id: string] : Array<string>} = {};
graph['A'] = ['B', 'C'];
graph['B'] = ['A', 'D'];
graph['C'] = ['E', 'A'];
graph['D'] = ['B'];
graph['E'] = ['C'];
let pos: Array<string> = ['A']

console.log(Deikstra(graph, pos))
