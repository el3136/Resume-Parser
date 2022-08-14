import React, {useState} from 'react'
import { storage, resumesCollection } from "../firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

export default function Upload() {

    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]


        if (!file) return;
        readExcel(file)
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
        navigate('/congrats')
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            addDoc(resumesCollection, {
                Name: d[0].Name,
                Experience: d[0].Experience,
                Skills: d[0].Skills
            })
        });
    };

  return (
    <div>
    <br/>
    <form onSubmit={handleSubmit} className='form' class="row g-3 justify-content-center">
        <div class="col-auto">
            <input class="form-control" type="file" required />
        </div>
        <div class="col-auto">
            <button class="btn btn-primary" type='submit'>Upload</button>
        </div>
    </form>
    <br/>
    <p class="text-center fs-2">Upload your resume!</p>
    </div>
  )
}


<div className='container'></div>
