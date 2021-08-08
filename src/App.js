
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './App.css';
import Post from './Component/Post';
import { auth, db } from './Databse/firebase'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import ImageUpload from './Content/ImageUpload';


import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {



  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false)

  // useEffect for Auth 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in 
        console.log('Auth User --- > ', authUser);
        setUser(authUser)
      }
      else {
        // user has not logged in 
        setUser(null);
      }
    })
    return () => {
      // perform some cleanup actions 
      unsubscribe();
    }
  }, [user, username]);


  // useEffect Runs  a piece of code based on a specific condition

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })

  }, []);


  const signUp = (e) => {

    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
    setOpen(false)

  }
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }


  // time : 2:42:22
  return (
    <div className="app">
      {/* I wanna have a caption input */}

      {/* file picker and post button */}

    

      {/* Model */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}

      >

        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" >
            <center>
              <img className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/Logo-Logo.svg"
                alt="logo"

              />
            </center>


            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />

            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />

            {/* {
            user ? <Button onClick={signUp} > Sign out  </Button>  
            :
            <Button onClick={signUp} > Sign In  </Button> 
          } */}

            <Button type="submit" onClick={signUp} > Sign Up  </Button>

          </form>




        </div>
      </Modal>



      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}

      >

        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" >
            <center>
              <img className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/Logo-Logo.svg"
                alt="logo"

              />
            </center>




            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />

            {/* {
            user ? <Button onClick={signUp} > Sign out  </Button>  
            :
            <Button onClick={signUp} > Sign In  </Button> 
          } */}

            <Button type="submit" onClick={signIn} > Login  </Button>

          </form>




        </div>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Logo-Logo.svg"
          alt="no logo"
        />


        {
          user ?
            (


              <Button onClick={() => auth.signOut()} > Logout  </Button>

            )
            : (
              <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)} > Sign In  </Button>

                <Button onClick={() => setOpen(true)} > Sign Up  </Button>
              </div>
            )
        }

      </div>

      {/* posts */}


      {/* <Button onClick={() => setOpen(true)}>Sign up</Button> */}

      <div className="app__posts">

        
        


          <div className="app__postsLeft">
            {
              posts.map(({ id, post }) => (
                <Post
                  key={id}
                  postId={id} 
                  user={user}
                  username={post.username}
                  imageUrl={post.imageUrl}
                  caption={post.caption}
                />
              ))
            }
          </div>



          <div className="app__postRight">
            {/* not working insta embed */}
            here there should be insta embeding ;

            {/* <InstagramEmbed
              url='https://www.instagram.com/p/B_uf9dmAGPw/'
              //   clientAccessToken='123|456'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => { }}
              onSuccess={() => { }}
              onAfterRender={() => { }}
              onFailure={() => { }}
            />  */} 

            <div> 

              
The 32 Most Iconic Poems in the English Language
Plus Some Bonus Poems, Because We Love You
By Emily Temple
March 7, 2019

Today is the anniversary of the publication of Robert Frost’s iconic poem “Stopping by Woods on a Snowy Evening,” a fact that spurred the Literary Hub office into a long conversation about their favorite poems, the most iconic poems written in English, and which poems we should all have already read (or at least be reading next). Turns out, despite frequent (false) claims that poetry is dead and/or irrelevant and/or boring, there are plenty of poems that have sunk deep into our collective consciousness as cultural icons. (What makes a poem iconic? For our purposes here, it’s primarily a matter of cultural ubiquity, though unimpeachable excellence helps any case.) So for those of you who were not present for our epic office argument, I have listed some of them here.

NB that I limited myself to one poem per poet—which means that the impetus for this list actually gets bumped for the widely quoted (and misunderstood) “The Road Not Taken,” but so it goes. I also excluded book-length poems, because they’re really a different form. Finally, despite the headline, I’m sure there are many, many iconic poems out there that I’ve missed—so feel free to extend this list in the comments. But for now, happy reading (and re-reading):

William Carlos Williams, “The Red Wheelbarrow”

The most anthologized poem of the last 25 years for a reason. See also: “This is Just to Say,” which, among other things, has spawned a host of memes and parodies.

T. S. Eliot, “The Waste Land”

Without a doubt one of the most important poems of the 20th century. “It has never lost its glamour,” Paul Muldoon observed. “It has never failed to be equal to both the fracture of its own era and what, alas, turned out to be the even greater fracture of the ongoing 20th century and now, it seems, the 21st century.” See also: “The Love Song of J. Alfred Prufrock.”

Robert Frost, “The Road Not Taken”

Otherwise known as “the most misread poem in America.” See also: “Stopping by Woods on a Snowy Evening.” And “Birches.” All begin in delight and end in wisdom, as Frost taught us great poems should.

Gwendolyn Brooks, “We Real Cool”

This blew my mind in high school, and I wasn’t the only one.

Elizabeth Bishop, “One Art”

Bishop’s much loved and much discussed ode to loss, which Claudia Roth Pierpont called “a triumph of control, understatement, wit. Even of self-mockery, in the poetically pushed rhyme word “vaster,” and the ladylike, pinkies-up “shan’t.” An exceedingly rare mention of her mother—as a woman who once owned a watch. A continent standing in for losses larger than itself.”
            </div>




          </div>

       
      </div>





      {user?.displayName ? (
        <ImageUpload username={user.displayName} />

      ) : (
        <h3>
          sorry you need to login  first to upload
        </h3>
      )}






      {/* posts */}
    </div>
  );
}
// 
export default App;
