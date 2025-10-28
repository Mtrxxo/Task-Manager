const Form = ({ input, handleChange, handleSubmit }) => {
  return (
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="user_input">Input a task</label>
        <input type="text" name="user_input" id="user_input" placeholder="Input a task" value={input} onChange={handleChange} autoFocus />
        <button type="submit" tabIndex={0}>Save</button>
    </form>
  )
}

export default Form