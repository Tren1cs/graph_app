type GraphEvent = {
    name: String,
    mainVertexID: String,
    affectedVerticiesIDs: String[],
    affectedRebrsIDs: String[]
}
type GraphEventTree = { Name: String, Description: String, Events: GraphEvent[] } | undefined;

export {
    type GraphEventTree,
    type GraphEvent
}