function Demo(props){
    const s = props.data;
    return (
        <div>
            <h1>Xin chao {s.name}, so dien thoai: {s.tel}</h1>
            <h2>Email: {s.email}</h2>
            <h2>Dia chi: {s.address}</h2>
        </div>
    )
}
export default Demo;