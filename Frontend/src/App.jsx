import { useState, useEffect, use } from 'react'
import axios from 'axios'
import MyButton from './components/MyButton'
import './App.css'
const baseURL = "http://localhost:3000/fruits"

function App() {
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    getAllFruits()
  }, [])

  const getAllFruits = async () => {
    const {data} = await axios.get(baseURL)
    setFruits(data)
  }

  const createFruit = async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const quantity = document.getElementById('quantity').value
    const price = document.getElementById('price').value
    const newFruit = {"name":name, "quantity":quantity, "price":price}
    const {data} = await axios.post(baseURL,newFruit)
    setFruits([...fruits,data])
    getAllFruits()
  }

  const updateFruit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const quantity = document.getElementById('quantity').value
    const price = document.getElementById('price').value
    const {data} = await axios.put(`${baseURL}/${id}`, {name,quantity,price})
    setFruits(fruits.map(fruit => fruit.id === id ? data : fruit))
    getAllFruits()
  }

  const fillForm = (id) => {
    const fruit = fruits.find(fruit => fruit.id === id)
    document.getElementById('id').value = fruit.id
    document.getElementById('name').value = fruit.name
    document.getElementById('quantity').value = fruit.quantity
    document.getElementById('price').value = fruit.price
  }

  const deleteFruit = async (id) => {
    await axios.delete(`${baseURL}/${id}`)
    getAllFruits()
  }

  return (
    <>
      <form>
        <fieldset>
          <legend> Kiválasztott gyümölcs adatai</legend>
          <input type="hidden" name='id' id='id'/>
          <input type="text" name="name" id="name" placeholder="Gyümölcs neve"/>
          <input type="number" name="quantity" id="quantity" placeholder="quantity"/>
          <input type="number" name="price" id="price" placeholder="price"/>
        </fieldset>
        <MyButton color="green" onClick={createFruit}>Küldés</MyButton>
        <MyButton color="orange" onClick={updateFruit}>Módosítás</MyButton>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Módosítás</th>
            <th>Törlés</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map(({id, name, quantity, price}) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td><MyButton color='blue' onClick={() => fillForm(id)}>Módosít</MyButton></td>
              <td><MyButton color='red' onClick={() => deleteFruit(id)}>Törlés</MyButton></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App