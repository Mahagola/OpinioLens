import react, { useState } from "react";
import logo from './logo.svg';
function CommentAnalyzer(){
    const [videoUrl, setVideoUrl]=useState('');
    const [comments, setComments]=useState([]);
    const fetchComments=async()=>{
        try{
            const apiKey='your api key';
            const vdoId='your vdo id'; //need to write extract video id function to extract id
            const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${vdoId}&key=${apiKey}`;
            const response=await fetch(apiUrl);
            const data=await response.json();
            const newComments=data.items.map((items,index)=>items.snippet.topLevelComment.snippet.textDisplay);
            setComments(newComments);
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
                    {
                        comments.map((comment,index)=>{
                            <li key={index}>{comment}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
export default CommentAnalyzer
