import React, { Component } from 'react'

export default class FormPage extends Component {
    constructor(){
        super()
        this.state={
            firstName : "",
            lastName : "",
            email: "",
            password: "",
        
            firstNameErr : "",
            lastNameErr : "",
            emailErr : "",
            passwordErr :"",

            showData :[],
        }
    }
    componentDidMount (){
       this.handleDeempAPi()
    
    }

    handleDeempAPi=async()=>{
      let response = await fetch("https://jsonplaceholder.typicode.com/posts")
      let dataAll = await response.json()
      console.log(dataAll)

    }
    handleInput=(e)=>{
        e.preventDefault()
        const {name , value} = e.target
     this.setState({[name]: value})
    }

    formValidation =()=>{
     let firstNameErr ='';
     let lastNameErr ='';
     let emailErr = '';
     let passwordErr ='';
     if(this.state.firstName.length <=4){
          firstNameErr ='First Name should be more than 4 character'
     }
     if(this.state.lastName.length < 1){
        lastNameErr =' Last Name is required'
   }
   if(!this.state.email.includes("@")){
    emailErr ='Enter the valid Email Id'
}
    if(this.state.password.length<8){
    passwordErr ='Enter password more than 8 character'
}
  if(firstNameErr || lastNameErr|| emailErr || passwordErr){
    this.setState({firstNameErr:firstNameErr, 
        lastNameErr :lastNameErr,
        emailErr :emailErr,
        passwordErr: passwordErr
    })
  }
  else{
    this.setState({firstNameErr:firstNameErr, 
        lastNameErr :lastNameErr,
        emailErr :emailErr,
        passwordErr: passwordErr
    })
  }
    }
    handleSubmit=(e)=>{
         e.preventDefault(); 
        const userData = {
            "FirstName" : this.state.firstName,
            "LastName" : this.state.lastName,
            "email" : this.state.email,
            "password" : this.state.password
        }
        const dataStrigify = JSON.stringify(userData)
         localStorage.setItem('userdata',dataStrigify)
// --------------------------------get localStorage---------------
         let getData =  localStorage.getItem('userdata')
        //  console.log(getData)
         if (getData) {
            const userData = JSON.parse(getData);
             
            this.setState({ showData: userData }, () => {
                console.log(this.state.showData);
                this.setState({showData: userData })
              });
          }
       console.log(userData)
      

       console.log("Submitted")
       this.formValidation()
    }
    render() {
        return (
            <>
                <div className='container mt-5'>
                    <div className='row'>
                       <div className='col-md-4'></div>
                       <div className='col-md-4'>
                       <div className='card'>
                            <div className='card-body'>
                                <form>
                                <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">First Name</label>
                                        <input type="text" className="form-control" id="exampleInputfirstName" placeholder="First Name" onChange={(e)=>{this.handleInput(e)}} value={this.state.firstName} name='firstName'/>
                                        <p className='text-danger'>{this.state.firstNameErr}</p>
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputLastName">Last Name</label>
                                        <input type="text" className="form-control" id="exampleInputLastName" placeholder="Last Name" onChange={(e)=>{this.handleInput(e)}} value={this.state.lastName} name='lastName'/>
                                        <p className='text-danger'>{this.state.lastNameErr}</p>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{this.handleInput(e)}} value={this.state.email} name='email'/>
                                        <p className='text-danger'>{this.state.emailErr}</p>
                                           
                                    </div>
                                  
                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{this.handleInput(e)}} value={this.state.password} name='password'/>
                                        <p className='text-danger'>{this.state.passwordErr}</p>
                                    </div>
                                
                                   <div className='mt-2'>
                                   <button type="submit" className="btn submitBtn" onClick={(e)=>{this.handleSubmit(e)}}>Submit</button>
                                   </div>
                                </form>

                            </div>
                        </div>
                       </div>
                       <div  className='col-md-4'>
                        <table className='table table-stripped'>
                         <thead>
                         <tr>
                                <th>S.No</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                         </thead>
                            <tbody>
                              <tr>
                              <td></td>
                               <td>{this.state.showData.FirstName}</td>
                               <td>{this.state.showData.LastName}</td>
                               <td>{this.state.showData.email}</td>
                              </tr>
                            </tbody>


                        </table>
                       </div>

                    </div>
                </div>
            </>
        )
    }
}
