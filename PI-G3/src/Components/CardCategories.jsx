

const CardCategories = ({item, onClick,}) => {
  const {imagen,nombre} = item;
  

  return (
    <div className='container-card-categories' >
      <img onClick={onClick} className='img-card-categories' src={imagen} alt={nombre}/>
    <div className='title-card-categories'>
        <p className='title'>{nombre}</p>
       
      </div>
    </div>

  )
}

export default CardCategories