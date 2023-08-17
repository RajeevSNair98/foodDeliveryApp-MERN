import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={value} onChange={(e)=> setValue(e.target.value)} className="form-control" placeholder='Enter new category'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default CategoryForm