import { getAPI } from 'pixabay-api';
import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/LoadMore';
import Loader from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state ={
    images : [],
    currentPage : 1,
    searchQuery: '',
    isLoading: false,
    isError: false,
    isEnd: false,
  }

  fetchImage = async () => {
    const {searchQuery, currentPage} = this.state;

    this.setState({isLoading: true, isError: false});

    try{
      const res = await getAPI(searchQuery,currentPage);

      console.log(res);

      const {totalHits, hits} = res;
      //Check api results
      if (hits.length === 0){
        toast.error('Sorry, there are no images matching your search query. Please try again');
        this.setState({isLoading: false});
        return;
      }

      //Success Image Fetch
      if (currentPage === 1){
        toast.success(`Hooray!, We Found ${totalHits} images`);
      }

      //check all results were loaded
      if (currentPage * 12 >= totalHits){
        this.setState({isEnd: true});
        toast("We're sorry, you've reacched the end of the results",);
      }

      this.setState(prevState => ({
        images: currentPage === 1 ? hits: [...prevState.images,...hits],
        isEnd: prevState.images.length + hits.length >=totalHits,
      }))
    }
    catch(error){
      // Handle any errors that occur during the API request
      this.setState({ isError: true });
      toast.error('Oops, something went wrong! Reload this page!');
    }
    finally{
     // Ensure loading state is reset once the API request completes
      this.setState({ isLoading: false });
    }
  }
    handleSearchSubmit = query => {
      const normalizedQuery = query.trim().toLowerCase();
      const normalizedCurrentQuery = this.state.searchQuery.toLowerCase();
  
      // Validate the search query to prevent empty searches
      if (normalizedQuery === '') {
        alert(`Empty string is not a valid search query. Please type again.`);
        return;
      }

      // Only update the state and fetch images if the new query is different
    if (normalizedQuery !== normalizedCurrentQuery) {
      this.setState({
        searchQuery: normalizedQuery,
        currentPage: 1,
        images: [],
        isEnd: false,
        });
      }
    }

    handleLoadMore = () => {
    // Increment the current page to load more images, unless at the end
      if (!this.state.isEnd) {
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
      } else {
      alert("You've reached the end of the search results.");
      }
    }
  
  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && !isError && images.length > 0 && !isEnd && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isError && <p>Something went wrong. Please try again later.</p>}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    )
  }
}
