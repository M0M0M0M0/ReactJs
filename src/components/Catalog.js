function Catalog(props){
    const cat = props.data;
    return (
        <div>
            <h1>Catalog Name: {cat.name}</h1>
            <h2>Item Count: {cat.count} products</h2>
        </div>
            
    )
}
export default Catalog;