import useFetchData from '../hooks/useFetchData';
import './App.css';

function App() {
  const postsData = useFetchData('http://localhost:1337/api/posts?populate[0]=image&populate[1]=author.image');
  const videoGamesData = useFetchData('http://localhost:1337/api/videogames?populate=*');

  //console.log(postsData.result);
  console.log(videoGamesData.result);

  if (postsData.loading || videoGamesData.loading) return <p>Loading...</p>;
  if (postsData.error || videoGamesData.error) return <p>Error</p>;

  return (
    <>
      <h1>Strapi v4 - Obteniendo datos</h1>
      <div style={{paddingTop:'30px'}}>
      {postsData.result && postsData.result.data && postsData.result.data.map(post => (
        <div key={post.id} style={{paddingTop:'30px'}}>
          <h1>{post.attributes.title}</h1>
          <img src={`http://localhost:1337${post.attributes.image.data[0].attributes.url}`} 
          alt='post image' 
          height={200} 
          width={200} 
          style={{
            borderRadius: '10px', 
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}
          />
          <p style={{textAlign:'justify'}}>{post.attributes.content}</p>
          {post.attributes.author.data && (
            <div>
              <p style={{textAlign:'justify', fontSize:'24px'}}><span style={{marginRight:'10px', fontSize:'8px'}}>🔵</span>Autor: {post.attributes.author.data.attributes.name}</p>
              <p style={{textAlign:'justify'}}>{post.attributes.author.data.attributes.description}</p>
              <img src={`http://localhost:1337${post.attributes.author.data.attributes.image.data.attributes.formats.thumbnail.url}`} alt="" style={{
                 borderRadius: '100px', width:'100px', marginBottom:'30px', display:'flex', alignItems:'flex-start', boxShadow: '2px 2px 2px rgba(255, 255, 255, 0.2)'
               }} />
          <hr style={{ borderColor: 'grey' }} />
            </div>
          )}
        </div>
      ))}
      </div>
      <div style={{paddingTop:'30px'}}>
      {videoGamesData.result && videoGamesData.result.data && videoGamesData.result.data.map(videoGame => (
        <div key={videoGame.id} style={{paddingTop:'20px'}}>
          <h1>{videoGame.attributes.title}</h1>
          <img src={`http://localhost:1337${videoGame.attributes.cover.data.attributes.formats.thumbnail.url}`} 
          alt='post image' 
          height={200} 
          width={200} 
          style={{
            borderRadius: '10px', 
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}
          />
          <p style={{textAlign:'justify'}}>{videoGame.attributes.description}</p>
          
            {videoGame.attributes.platforms && (
            <div>
          <p style={{ textAlign: 'justify', fontSize: '20px' }}>
            <span style={{ marginRight: '10px', fontSize: '8px' }}>🔵</span>
            Platforms: {videoGame.attributes.platforms.data.map(platform => platform.attributes.name).join(', ')}.
          </p>
          <hr style={{ borderColor: 'grey' }} />
            </div>
          )}
        </div>
      ))}
      </div>        
    </>
  )
}

export default App;
