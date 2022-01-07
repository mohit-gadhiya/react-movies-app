import React, { Component } from 'react'

export default class Favourite extends Component {
   constructor(){
      super();
      this.state = {
         genre: [],
         currGenre:'All Genres',
         movie: [],
         currText:'',
         limit: 5,
         currPage:1
      }
   }
   componentDidMount(){
      let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
      let data = JSON.parse(localStorage.getItem("movies-data") || "[]")
      console.log(data);
   
      let temp = [];
      data.forEach((movieObj) => {
         if(!temp.includes(genreids[movieObj.genre_ids[0]])){
            temp.push(genreids[movieObj.genre_ids[0]])
         }
      })
      temp.unshift("All Genres");
      this.setState({
         genre:[...temp],
         movie:[...data]
      })
   }
   handleGenreChange = (genre) => {
      this.setState({
         currGenre:genre
      })
   }
   sortPopularityDesc = ()=>{
      let temp = this.state.movie;
      temp.sort(function(objA,objB){
         return objB.popularity - objA.popularity
      })
      this.setState({movie:[...temp]})
   }
   sortPopularityAsc = () => {
      let temp = this.state.movie;
      temp.sort(function(objA,objB){
         return objA.popularity - objB.popularity
      })
      this.setState({movie:[...temp]})
   }
   sortRatingDesc = () => {
      let temp = this.state.movie;
      temp.sort(function(objA,objB){
         return objB.vote_average - objA.vote_average
      })
      this.setState({movie:[...temp]})
   }
   sortRatingAsc = ()=>{
      let temp = this.state.movie;
      temp.sort(function(objA,objB){
         return objA.vote_average - objB.vote_average
      })
      this.setState({movie:[...temp]})
   }
   handlePageChange = (page) =>{
      this.setState({
         currPage:page
      })
   }
   handleDelete = (id) =>{
      let newArr = [];
      newArr = this.state.movie.filter((movieObj) =>movieObj.id !== id)
      this.setState({
         movie:[...newArr]
      })
      localStorage.setItem("movies-data", JSON.stringify(newArr))
   }
   render() {
      let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
      27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
      let filterArr = [];
      if(this.state.currText === '') {
         filterArr = this.state.movie
      }else{
         filterArr = this.state.movie.filter((movieObj)=>{
            let title = movieObj.original_title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase())
         })
      }
      if(this.state.currGenre !== 'All Genres'){
         filterArr = this.state.movie.filter((movieObj)=>genreids[movieObj.genre_ids[0]] === this.state.currGenre)
      }
      let pages = Math.ceil(filterArr.length / this.state.limit);
      let pagesArr = [];
      for(let i=1; i<=pages; i++) {
         pagesArr.push(i);
      }
      let si = (this.state.currPage-1)*this.state.limit;
      let ei = si + Number(this.state.limit);
      filterArr = filterArr.slice(si,ei);
     
      return (
         <div>
            <>
               <div className="main">
                  <div className="row">
                     <div className="col-lg-3 col-sm-12">
                        <ul className="list-group favourite-gener">
                           {
                              this.state.genre.map((genre)=>(
                                 this.state.currGenre === genre ? 
                                 <li className="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li> : 
                                 <li className="list-group-item" style={{color:'#3f51b5'}} onClick={() => this.handleGenreChange(genre)}>{genre}</li>  
                              ))
                           }
                        </ul>
                     </div>
                     <div className="col-lg-9 favourite-table col-sm-12">
                        <div className='row'>
                           <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({currText:e.target.value})}></input>
                           <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e) => this.setState({limit:e.target.value})}></input>
                        </div>
                        <div className="row">
                           <table className="table">
                              <thead>
                                 <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genres</th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}/>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}/></th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}/>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}/></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    filterArr.map((movieObj)=>(
                                       <tr>
                                          <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt= {movieObj.title} style= {{width:'4rem',borderRadius:'4px'}}/> {movieObj.original_title}</td>
                                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                                          <td>{movieObj.popularity}</td>
                                          <td>{movieObj.vote_average}</td>
                                          <td><button type="button" className="btn btn-danger" onClick={() =>this.handleDelete(movieObj.id)} >Delete</button></td>
                                       </tr>
                                    ))
                                 }
                              </tbody>
                           </table>
                        </div>
                        <nav aria-label="Page navigation example">
                           <ul className="pagination">
                              {
                                 pagesArr.map((page) => (
                                    <li className="page-item"><a className="page-link" onClick = {()=>this.handlePageChange(page)}>{page}</a></li>
                                 ))
                              }
                           </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </>
         </div>
      )
   }
}
