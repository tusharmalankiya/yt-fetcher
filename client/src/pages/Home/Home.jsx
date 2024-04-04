import React, { useContext, useState } from "react";

import { MdAudiotrack, MdVideocam, MdDownload } from "react-icons/md";

import {
  Button,
  Container,
  DownloadButton,
  Heading,
  Thumbnail,
  Title,
  YLink,
} from "./HomeStyles";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { UrlContext } from "../../contexts/UrlContext";

const Home = () => {
  const { hostUrl } = useContext(UrlContext);
  const [loader, setLoader] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);

  // const [videoPath, setVideoPath] = useState("");

  const downloadVideo = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${hostUrl}:6002/y2video?url=${videoUrl}`
        // {
        // responseType: 'blob',
        // }
      );
      // const blob = new Blob([response.data], { type: response.headers['content-type'] });
      // const url = window.URL.createObjectURL(blob);
      // console.log(url);
      // setDownloadLink(url);

      setDownloadLink(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setVideoUrl("");
    }
  };

  const downloadAdaptive = async () => {
    setLoader(true);

    try {
      const res = await axios.post(
        `${hostUrl}:6002/y2adaptive`,
        { url: videoUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setDownloadLink(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setVideoUrl("");
    }
  };

  const downloadAudio = async () => {
    setLoader(true);
    console.log(videoUrl);
    try {
      const res = await axios.post(
        `${hostUrl}:6002/y2audio`,
        { url: videoUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setDownloadLink(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setVideoUrl("");
    }
  };
  // const pasteIt = async () =>{
  //   const text = await navigator.clipboard.readText();
  //   // document.getElementById("yt-url").value = text;
  //   // console.log(text);
  //   setVideoUrl(text);
  // }

  if (loader)
    return (
      <div style={{ height: "100vh" }}>
        <Loading />{" "}
      </div>
    );

  const handleDownloadButton = () => {
    // window.alert("downloaded Successfully");
    document.getElementById("download-button").style.display = "none";
    setDownloadLink(null);
  };

  return (
    <Container>
      <Heading>Download Video and Audio from YouTube</Heading>
      <YLink
        id="yt-url"
        type="text"
        name={Date.now()}
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={(event) => setVideoUrl(event.target.value)}
        autocomplete="off"
      />
      {/* <Button onClick={pasteIt} > Paste Link </Button> */}
      <Button style={{ background: "#804674" }} onClick={downloadVideo}>
        <MdVideocam size={30} style={{ margin: "5px" }} /> Convert to Video
      </Button>
      <Button onClick={downloadAudio}>
        <MdAudiotrack size={30} style={{ margin: "5px" }} /> Convert to Audio{" "}
      </Button>
      {/* <Button style={{ background: "#804674" }} onClick={downloadAdaptive}>
        <MdVideocam size={30} style={{ margin: "5px" }} /> Convert to Adaptive{" "}
      </Button> */}

      {downloadLink && <Title style={{textAlign:"center"}}>{downloadLink.title}</Title>}
      {downloadLink && (
        <Thumbnail src={downloadLink.thumbnail} alt={downloadLink.title} />
      )}

      {downloadLink && <h3 style={{textAlign:"center"}}>{downloadLink.filesize} MB</h3>}

      {downloadLink && (
        <DownloadButton
          id="download-button"
          href={`${hostUrl}:3000/${downloadLink.filepath}`}
          onClick={handleDownloadButton}
          download
        >
          {" "}
          <MdDownload size={30} style={{ margin: "5px" }} />
          Download{" "}
        </DownloadButton>
      )}
    </Container>
  );
};

export default Home;
