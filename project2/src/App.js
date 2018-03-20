import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends Component {

 constructor(){
    super();   

    /*binding "This" to the function loadMainPageCallBack because of javascript function inside function
    loses the scope of what this is, so this is needed so the callback function refers back to ViewEvents*/
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {htmlcode: ""}
  }

  static defaultProps = {departments: ["ACFM", "OFFAF", "ANBE", "ANTH", "ARBC", "ARTH",
                        "ARST", "ARTR" , "BIOL", "BMEG" , "OFFL", "OFFD", "OFFF",
                        "OFFAT", "OFFGH", "OFFG", "OFFCB", "CHEG", "CSCI", "CHIN",
                        "CEEG", "CLAS" , "ENCW", "DANC", "OFFDN", "EAST", "ECON",
                        "EDUC", "ECEG", "ENGR", "ENGL", "ENST", "ENFS", "FOUN", 
                        "FREN" , "GEOL", "GEOG", "GRMN", "GREK", "GLBM", "HEBR",
                        "HIST", "HUMN", "IDPT", "OFFJP", "JAPN", "LATN", "LAMS"
                        , "LEGL", "LING", "ENLS", "MGMT", "MSUS", "MIDE",
                        "MATH", "MECH", "MILS", "MUSC", "NEUR", "OCST", "PHIL",
                        "PHYS", "POLS", "PSCY", "RELI", "RUSS", "RESC", "SIGN",
                        "SPAN", "SOCI", "SLIF", "THEA", "UNIV", "WMST"] ,
                
                        requirements: ['N/A', 'AHLG', 'ARHC', 'CBL', 'CCFL', 'CCIP', 'CCQR', 
                        'DUSC', 'EGHU', 'EGSS', 'EVCN', 'FOUN', 'FRST', 'GBCC', 
                        'GLSP', 'LBSC', 'NMLG', 'NSMC', 'RESC', 'SL',  'SLSC', 
                        'SSLG', 'W1', 'W2'] ,

                        limit: [5, 10, 15, 20]
                }

  handleSubmit(e){
    e.preventDefault()
    var department = "Department=" + this.refs.department.value
    var ccc = "CCCReq=" + this.refs.ccc.value
    var limit = "limit=" + this.refs.limit.value

    if(this.refs.ccc.value === "N/A"){
      ccc= ""
    }
    var query = department + "&" + ccc + "&" + limit
    console.log(query)

    fetch('http://eg.bucknell.edu:48484/q?'+ query)
      .then( response => {
          var json = response.json()
          return json
        }).then(jsonResponse => {
          console.log(jsonResponse)
          console.log(jsonResponse["message"])
          this.renderClasses(jsonResponse["message"])
        })

      .catch( error => console.log("ERROR", error)) 
  }

  renderClasses(classes){
    var html = []
    for (var i = 0; i < classes.length;  i += 1) {
      html.push("CRN: "+ classes[i]["CRN"] + ", Title: "+ classes[i]["Title"] +
       ", Course Name: " + classes[i]["Course"] +", Meeting Time: " + classes[i]["Meeting Time"])
    }

    const listItems = html.map((text) => <li>{text}</li>);

    console.log(html)
    this.setState({htmlcode: listItems})
  }

  render() {

    let Department = this.props.departments.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    let CCC = this.props.requirements.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    let limits = this.props.limit.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    var htmlCode = this.state.htmlcode 
    console.log("In render here is htmlcode = ", htmlCode)
    return (
    <div>
      <div className = "container">

        <br></br>
        <h1 id="title"> What are classes you can take based on a department? Need a class that satisfies a special CCC? </h1>
        <div id= "information">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                  <label>Department</label><br />
                    <select ref="department">
                      {Department}
                    </select>
              </div>
           
              <div>
                  <label>CCC Requirement</label><br />
                    <select ref="ccc">
                      {CCC}
                    </select>
              </div>

              <div>
                  <label>Display How Many Classes</label><br />
                    <select ref="limit">
                      {limits}
                    </select>
              </div>

              <br />
              <input type="submit" className="btn btn-primary" value="View Required Classes"/>
              <br />

            </form>
            <br />  
          </div> 

          <div id="courses">
              <ol>{htmlCode}</ol>
          </div>
        </div> 
    </div>//div to wrap everything into one element
    );

        
  }//renders bracket
}//class bracket

export default App;
