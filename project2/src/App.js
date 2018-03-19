import React, { Component } from 'react';
import './App.css';

class App extends Component {

 constructor(){
    super();   

    /*binding "This" to the function loadMainPageCallBack because of javascript function inside function
    loses the scope of what this is, so this is needed so the callback function refers back to ViewEvents*/
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {submitted: false}
  }

  static defaultProps = {majors: ["Accounting & Financial Management", "Africana Studies" , "Animal Behavior" , "Anthropology" , "Applied Mathematical Sciences" ,
                  "Art – Studio",  "Art History" , "Biology" , "Cell Biology & Biochemistry",  "Chemistry" ,
                  "Classics & Ancient Mediterranean Studies" , "Comparative Humanities" , "Computer Science" , 
                  "Early Childhood Education" , "East Asian Studies" , "Economics" , "Education" ,
                  "English - Creative Writing" , "English - Film/Media Studies" , "English - Literary Studies" ,
                  "Environmental Geosciences" , "Environmental Science",  "Environmental Studies" ,
                  "French & Francophone Studies",  "Geography",  "Geology" , "German Studies",  "History" ,  
                  "International Relations" , "Italian Studies" , "Latin American Studies" , 
                  "Linguistics" , "Mathematical Economics" ,  "Mathematics" , "Music – Bachelor of Arts" , 
                  "Music – Bachelor of Music" , "Neuroscience" , "Philosophy" , "Physics" , "Political Science" ,  
                  "Psychology" , "Religious Studies",  "Russian Studies" , "Sociology" , "Spanish" ,  "Theatre" , 
                  "Women's & Gender Studies", "Managing for Sustainability" , "Global Management", 
                  "Markets, Innovation & Design", "Biomedical Engineering" , "Chemical Engineering" , "Civil Engineering" , "Computer Engineering" , 
                  "Computer Science & Engineering" , "Electrical Engineering" , "Environmental Engineering" ,  "Mechanical Engineering"] ,
                
                  years: ["2021", "2020", "2019", "2018"]
                }

  handleSubmit(){
    this.setState({submitted: true})
    var major = "Department= " + this.refs.major.value
    var year = "Year= " + this.refs.year.value
    var query = year + "&" + major

    fetch('http://eg.bucknell.edu:48484/q?'+ query)
      .then( response => {
          var json = response.json()
          return json
        }).then(jsonResponse => {
          console.log("finished parsing")
        })

      .catch( error => console.log("ERROR", error)) 
  }

  render() {

  let major = this.props.majors.map(category => {
        return <option key={category} value={category}>{category}</option>
      })

  let year = this.props.years.map(category => {
        return <option key={category} value={category}>{category}</option>
      })

  var submit = this.state.submitted;

  if(!submit){
        return (
          <div>
            <div className = "container">

              <h1 id="title"> What are classes you can take based on your major and year? </h1>
              <div id= "information">
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Major</label><br />
                          <select ref="major">
                            {major}
                          </select>
                    </div>
                 
                    <div>
                        <label>Year</label><br />
                          <select ref="year">
                            {year}
                          </select>
                    </div>
                    
                    <br />
                    <input type="submit" className="btn btn-primary" value="View Required Classes"/>
                    <br />

                  </form>
              <br />  
              </div>

            </div>

          </div>                
        );
     } else{

        return (
            <h1> Processing </h1>
          );
        
     }//else bracket
  }//renders bracket
}//class bracket

export default App;
