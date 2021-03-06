import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
   constructor(){
         super();
         this.state = {
            hover: '',
            parr:[1],
            currPage:1,
            movies:'',
            favourites:[]
         }
   }
   async componentDidMount(){
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4fa085ac779d5e61f5e531a5be2d4878&language=en-US&page=${this.state.currPage}`)
      let data = res.data;
      this.setState({
         movies:[...data.results]
      })
   }
   changeMovies = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4fa085ac779d5e61f5e531a5be2d4878&language=en-US&page=${this.state.currPage}`)
      let data = res.data;
      this.setState({
         movies:[...data.results]
      })
   }
   handleRight = () =>{
      let tempArr = [];
      for(let i = 1; i<=this.state.parr.length+1; i++) {
         tempArr.push(i);
      }
      this.setState({
         parr:[...tempArr],
         currPage:this.state.currPage+1
      }, this.changeMovies)
   }
   handleLeft = () =>{
      if(this.state.currPage !== 1){
         this.setState({
            currPage:this.state.currPage - 1
         },this.changeMovies)
      }
   }
   handleClick = (value) =>{
      if(value !== this.state.currPage){
         this.setState({
            currPage:value
         },this.changeMovies)
      }
   }
   handleFavourite=(movie)=>{
      let oldData = JSON.parse(localStorage.getItem("movies-data") || "[]")
      if(this.state.favourites.includes(movie.id)){
          oldData = oldData.filter((m)=>m.id!==movie.id)
      }else{
          oldData.push(movie)
      }
      localStorage.setItem("movies-data",JSON.stringify(oldData));
      console.log(oldData);
      this.handleFavouritesState();
  }
  handleFavouritesState=()=>{
      let oldData = JSON.parse(localStorage.getItem("movies-data") || "[]")
      let temp = oldData.map((movie)=>movie.id);
      this.setState({
          favourites:[...temp]
      })
  }
  checkFavourites = (arr, id) =>{
   for(let i=0; i<arr.length; i++) {
         if(arr[i].id===id) return true;
   }
   return false;
}
   render() {
      let favouriteArr = JSON.parse(localStorage.getItem("movies-data") || "[]")
      return (
         <>
         {
            this.state.movies.length === 0 ?
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div> : 
            <div>
               <h3 className = 'text-center'><strong>Trending</strong></h3>
               <div className='movie-list'>
                  {
                     this.state.movies.map((movieObj) =>(
                        <div className="card movies-card" onMouseEnter={() =>{this.setState({hover:movieObj.id})}} onMouseLeave={() =>{this.setState({hover:''})}}>
                           <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img"/>
                           <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                           <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                              {
                                 this.state.hover === movieObj.id &&  
                                 <a className="btn btn-primary movies-button" onClick={() =>this.handleFavourite(movieObj)}>{this.checkFavourites(favouriteArr, movieObj.id) ? "Remove from Favourite" : "Add to Favourite"}</a>
                              }
                           </div>
                        </div>
                     ))
                  }
               </div>
               <div style={{display:'flex',justifyContent:'center'}}>
                  <nav aria-label="Page navigation example">
                  <ul className="pagination">
                     <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                     {
                        this.state.parr.map((value)=>(
                           <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>                         
                        )) 
                     }
                     <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                  </ul>
                  </nav>
               </div>
            </div>
         }
         </>
      )
   }
}
