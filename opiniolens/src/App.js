import react, { useState } from "react";
import logo from './logo.svg';
function CommentAnalyzer(){
    const [videoUrl, setVideoUrl]=useState('');
    const [comments, setComments]=useState([]);
    const fetchComments=async()=>{
        try{
            const apiKey='API key here...';
            const vdoId='zfybpdHg3hg'; //need to write extract video id function to extract id
            let nextPgToken='';
            let allComments = [];
            do{
                const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&pageToken=${nextPgToken}&videoId=${vdoId}&order=relevance&key=${apiKey}`;
                const response=await fetch(apiUrl);
                const data=await response.json();
                if (!data.items) {
                    console.error('No "items" property in API response:', data);
                    break; // Exit the loop if there are no more items
                  }
            
                const newComments = data.items.map((item) => item.snippet.topLevelComment.snippet.textOriginal);
                allComments = [...allComments, ...newComments];
                nextPgToken = data.nextPageToken;
                setComments(allComments);
            }while(nextPgToken)
        }catch(error){
            console.error("error fetching comments", error);
        }
    }
    return(
        <div>
            <h1>Analyze ur reviews</h1>
            <label htmlFor="Enter your url"></label>
            <input type="text" 
                id="videoUrl"
                placeholder="Enter ur video url here"
                value={videoUrl}
                onChange={(e)=>setVideoUrl(e.target.value)}
            />
            <button onClick={fetchComments}>Fetch comments</button>
            <div>
                <h2>Comments List</h2>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default CommentAnalyzer
// to do : 1) reset whole function when user enters a new url
        // 2) categorize comments through open AI 