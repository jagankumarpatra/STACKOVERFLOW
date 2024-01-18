import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { CornerUpRight } from 'lucide-react';
import { Users } from 'lucide-react';
const generateRandomName = () => {
  const names = ["John", "Jane", "Alice", "Bob", "Eve"];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomDate = () => {
  const date = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12);
  const minutes = Math.floor(Math.random() * 60);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} `;
};
const formatViewCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  } else {
    return count.toString();
  }
};
const handleButtonClick=()=>{
  console.log("clicked");
}
var url =
  "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&filter=!14e99-)NWgNaSZ2uOIqYPGa(w38QVz6V*mbrDuSSSbCg.d";

async function pickQuestionId(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.hasOwnProperty("items") && data.items.length > 0) {
        var questions = data.items;
        var index = Math.floor(Math.random() * questions.length);
        var question_id = questions[index].question_id;
        console.log(question_id);
        return question_id;
      }
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
  }
}

function MainPart() {
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(0);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [reputation, setReputation] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [lastActivityDays, setLastActivityDays] = useState(0);
  const [creationDate, setCreationDate] = useState("");
  const [body, setBody] = useState("");
  const [ancount, setAncount] = useState(0);
  const [question_id, setQuestion_id] = useState();
  const [answers, setAnswers] = useState([]);
  const [commentcount,setcommentCount]=useState(0);

  const [randomAuthor, setRandomAuthor] = useState('');

  useEffect(() => {
    setRandomAuthor(`Author: ${generateRandomName()} (${Math.floor(Math.random() * 100)})  Answered: ${getRandomDate()} at ${getRandomTime()}`);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await pickQuestionId(url);
        setQuestion_id(id);

        const response = await fetch(
          `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();

        // Extract the title, score, profile image, name, reputation, view count, last activity days, and creation date from the response
        const questionTitle = data.items[0]?.title || "Title not found";
        setTitle(questionTitle);

        const questionScore = data.items[0]?.score || 0;
        setScore(questionScore);

        const profileImage = data.items[0]?.owner?.profile_image || "";
        setImage(profileImage);

        const ownerName = data.items[0]?.owner?.display_name || "";
        setName(ownerName);

        const ownerReputation = data.items[0]?.owner?.reputation || 0;
        setReputation(ownerReputation);

        // Assuming data is the object containing view_count
const questionViewCount = data.items[0]?.view_count || 0;
const formattedViewCount = formatViewCount(questionViewCount);
setViewCount(formattedViewCount);

        const questionLastActivityDate = data.items[0]?.last_activity_date || 0;
        // Calculate the difference in days from the current date
        const currentDate = new Date();
        const lastActivityDate = new Date(questionLastActivityDate * 1000);
        const daysDifference = Math.floor(
          (currentDate - lastActivityDate) / (1000 * 60 * 60 * 24)
        );
        setLastActivityDays(daysDifference);

        const questionCreationDate = data.items[0]?.creation_date || 0;
        const creationDateObj = new Date(questionCreationDate * 1000);

        // Format the creation date to "year month" format
        const formattedCreationDate = `${creationDateObj.getFullYear()} ${creationDateObj.toLocaleString(
          "default",
          { month: "long" }
        )}`;
        setCreationDate(formattedCreationDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBody = async () => {
      try {
        if (!question_id) {
          return; // If question_id is not set, skip fetching body
        }

        const bodyResponse = await fetch(
          `https://api.stackexchange.com/2.3/questions/${question_id}?order=desc&sort=creation&site=stackoverflow&filter=!6WPIomo7_4)SM`
        );

        if (!bodyResponse.ok) {
          throw new Error("Something went wrong fetching body");
        }

        const bodyData = await bodyResponse.json();
        const questionBody = bodyData.items[0]?.body || "Body not found";
        setBody(questionBody);

        const answerCount = bodyData.items[0]?.answer_count || 0;
        setAncount(answerCount);

        // Fetch answers
        const answersResponse = await fetch(
          `https://api.stackexchange.com/2.3/questions/${question_id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!6WPIompiwXoE5`
        );

        if (!answersResponse.ok) {
          throw new Error("Something went wrong fetching answers");
        }

        const answersData = await answersResponse.json();
        setAnswers(answersData.items);

        const commentCount = bodyData.items[0]?.comment_count || 0;
        setcommentCount(commentCount);

      } catch (error) {
        console.error("Error fetching body or answers:", error);
      }
    };

    fetchBody();
  }, [question_id]);

  const replaceAnchorTags = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const anchorTags = doc.querySelectorAll("a");
    anchorTags.forEach((anchor) => {
      anchor.outerHTML = `<span style="color: orange;">this</span>`;
    });

    return doc.body.innerHTML;
  };

  const segregateTags = (body) => {
    if (!body) {
      return null;
    }

    const modifiedBody = replaceAnchorTags(body);

    const parser = new DOMParser();
    const doc = parser.parseFromString(modifiedBody, "text/html");

    const pTags = Array.from(doc.querySelectorAll("p")).map((p, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: p.innerHTML }} />
    ));

      

    return <div>{pTags}</div>;

    
  };
// overflow :auto  on line 184
  return (
    <div>
    <div style={{  width: "700px", margin: "26px 0 0 220px",  color: "d3d3d3",  borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div style={{borderRadius: "8px 8px 0px 0px",backgroundColor:"#f48024"}}>
  <div style={{display: "flex", justifyContent: "space-between", height: "300px", padding: "20px" }}>
    <h1 style={{color: "#ffffff", fontSize: "23px", marginTop: "9px", marginLeft: "5px", overflow: "hidden", overflowWrap: "break-word", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
      {title}
    </h1>
    <div style={{ marginRight: "1px", borderRadius: "5px", width: "200px", height: "13%", marginTop: "20px", border: "1px solid white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px" }}>
      <button style={{ cursor: "pointer", border: "1px solid white", paddingLeft: "15px", paddingRight: "15px", color: "white", height: "100%", borderRight: "1px solid white", alignItems: "center", paddingTop: "3px", backgroundColor: "transparent", border: "none", transition: "background-color 0.3s" }} onMouseOver={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>-</button>
      <div style={{ color: "white", marginLeft: "30px", marginRight: "30px", alignItems: "center", fontSize: "18px" }}>{viewCount}</div>
      <button style={{ cursor: "pointer", border: "1px solid white", paddingTop: "3px", alignItems: "center", paddingRight: "15px", paddingLeft: "15px", color: "white", height: "100%", borderLeft: "1px solid white", backgroundColor: "transparent", border: "none", transition: "background-color 0.3s" }} onMouseOver={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"} onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>+</button>
    </div>

  </div>

  <hr style={{ border: "1px solid white", width: "700px", marginTop: "-210px" }} />

  <div style={{ display: "flex", alignItems: "center", marginLeft: "19px" }}>
  <img src={image} alt="Profile" style={{ marginTop: "10px", marginRight: "10px", width: '40px', height: '40px', borderRadius: '50%' }} />
  <div style={{ marginLeft: "5px", marginTop: "10px", color: "white" }}>{name}</div>
  <div style={{ width: "50px", height: "30px", border: "0px solid black", borderRadius: "5px", backgroundColor: "antiquewhite", marginTop: "10px", marginLeft: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>{reputation}</div>
  <div style={{ marginLeft: "9px", color: "white" }}>Asked {creationDate} </div>
  <div style={{ marginLeft: "10px", padding: "0 5px", color: "white", lineHeight: "90px" }}>|</div>
  <div style={{ marginLeft: "10px", color: "white" }}>Active {lastActivityDays} days ago</div>
  <div style={{ marginLeft: "10px", padding: "0 5px", color: "white", lineHeight: "90px" }}>|</div>
  <div style={{ marginLeft: "10px", color: "white", marginRight: "10px" }}>Viewed {viewCount} times</div>
</div>



  </div>
  <div style={{backgroundColor:"white", color: "black", padding: "20px", borderRadius: "8px", background: "creme", marginLeft: "20pxpx", marginRight: "15px", marginTop: "10px", marginBottom: "10px" }}>
    {segregateTags(body)}
  </div>

  <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", marginRight: "20px" }}>
    <div style={{marginBottom:"15px", marginRight: "20px", display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={faBookmark} style={{ color: "#ff6600", fontSize: "20px", marginRight: "5px", marginLeft: "15px" }} />
      <span style={{ fontSize: "20px",color:"#ff6600", fontWeight: "bold" }}>{ancount}</span>
    </div>
    <div style={{marginBottom:"15px", marginLeft: "auto" }}>
      <CornerUpRight style={{ color: "#333", fontSize: "24px" }} />
    </div>
    <div style={{marginBottom:"15px", marginLeft: "20px" }}>
      <Users style={{ color: "#333", fontSize: "24px" }} />
    </div>
  </div>
</div>


{/* answers part */}
<div style={{ marginTop: "10px", color: "black" }}>
  <p style={{ marginLeft: "223px", display: "inline" }}>{Math.abs(score)} Answers</p>
  <div style={{ display: "inline-flex", marginLeft: "20px" }}>
    <p style={{ marginRight: "20px", color: "orange",marginLeft:"424px",cursor:"pointer" }}>Votes</p>
    <p style={{ marginRight: "20px",cursor:"pointer" }}>Oldest</p>
    <p style={{ marginleft: "890px",cursor:"pointer" }}>Active</p>
  </div>

  <div style={{ width: "700px",marginBottom:"13px", margin: "10px 0 0 220px",  borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", position: "relative" }}>
  <div style={{alignItems:"center", top:"-4px", width: "60px", height: "4px", marginLeft: "520px", backgroundColor: "red", position: "absolute" }}></div>
 
<div style={{borderRadius:"5px", width: "700px", height: "100px", backgroundColor: "#F6F6F6" }}>
      <div><p style={{width:"50%",whiteSpace: "nowrap",marginLeft:"20px",paddingTop:"50px",display:"flex",flexDirection:"row", whiteSpace: "nowrap",marginTop:"20px", marginRight: "500px", color: "black" }}>{randomAuthor}</p></div>
  <div style={{whiteSpace: "nowrap",float:"right", width: "150px", marginTop: "10px", height: "30px", display: "flex", justifyContent: "flex-end", alignItems: "center", fontSize: "24px" }}>
    <div style={{marginBottom:"100px", borderRadius:"5px",backgroundColor:"orange", width: "300px", height: "40px", border: "1px solid white", display: "flex", alignItems: "center",marginRight:"25px" }}>
      <div style={{color:"white", height: "100%", borderRight: "1px solid white",paddingLeft:"10px",paddingTop:"10px", paddingRight: "10px", alignItems: "center" }}>-</div>
      <div style={{color:"white", marginLeft: "20px", marginRight: "20px", alignItems: "center" }}>{score}</div>
      <div style={{color:"white", height: "100%", borderLeft: "1px solid white",paddingLeft:"10px",paddingTop:"10px",paddingRight: "10px",  marginLeft:"10px", alignItems: "center" }}>+</div>
    </div>
  </div>
</div>

  <div style={{ padding: "16px", overflow: "auto" }}>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {answers.map((answer) => (
        <li key={answer.answer_id} style={{ marginBottom: "20px",marginLeft:"20px" }}>
          <div style={{ borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
            {segregateTags(answer.body)}
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

</div>


</div>

  );
}

export default MainPart;