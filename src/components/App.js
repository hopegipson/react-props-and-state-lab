import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }


  onFindPetsClick = (event) => {
    let urlPets = "/api/pets"
    if (this.state.filters.type !== "all") {
      urlPets += `?type=${this.state.filters.type}`
    }

    fetch(urlPets)
    .then(data => data.json())
    .then(data => this.setState({
      pets: data
    }))
  }

  onAdoptPet = (id) => {
  this.state.pets.find(pet => pet.id === id).isAdopted = true

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} type={this.state.filters.type} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
