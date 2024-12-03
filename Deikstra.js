function Deikstra(graph, pos) {
    var timeline = [];
    var vis = {};
    var time = 0;
    var pos2 = [];
    for (var vertex in graph) {
        vis[vertex] = false;
    }
    for (var i = 0; i < pos.length; i++) {
        vis[pos[i]] = true;
    }
    while (pos.length > 0) {
        timeline.push([]);
        while (pos.length > 0) {
            var vertex = pos[pos.length - 1];
            pos.pop();
            timeline[time].push(vertex);
            for (var j = 0; j < graph[vertex].length; j++) {
                var neighbor = graph[vertex][j];
                if (vis[neighbor] == false) {
                    pos2.push(neighbor);
                    vis[neighbor] = true;
                }
            }
        }
        while (pos2.length > 0) {
            pos.push(pos2[pos2.length - 1]);
            pos2.pop();
        }
        time++;
    }
    return timeline;
}
var graph = {};
graph['A'] = ['B', 'C'];
graph['B'] = ['A', 'D'];
graph['C'] = ['E', 'A'];
graph['D'] = ['B'];
graph['E'] = ['C'];
var pos = ['A'];
console.log(Deikstra(graph, pos));
