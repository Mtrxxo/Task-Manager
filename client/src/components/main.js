import Form from './form';

const Main = ({ input, collection, handleChange, handleSubmit, deleteTask, updateTask }) => {
  return (
    <main>
        <Form input={input} handleChange={handleChange} handleSubmit={handleSubmit} />
        <section>
          <ul>
            {collection.map((item, index) => {
              return (
                <div key={index} className='list_item'>
                  <input type="checkbox" name="" id="" aria-describedby='list_item' className='check' onClick={() => updateTask(item._id, item.complete)} checked={item.complete} />
                  <li id='list_item' className={`${item.complete ? 'done' : ''}`}>{item.task}</li>
                  <button onClick={() => deleteTask(item._id)} tabIndex={0}>Delete</button>
                </div>
              )
            })}
          </ul>
        </section>
    </main>
  )
}

export default Main