"use client";

import { useEffect, useState } from "react";
import CVPreview from "@/components/CVPreview";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function CVPage() {


  const [data,setData] = useState<any>(null);

  const [loading,setLoading] = useState(true);





  useEffect(()=>{


    const getCV = async()=>{


      try{


        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );



        if(!user.id){

          console.log(
            "User belum login"
          );

          setLoading(false);

          return;

        }




        const res = await fetch(
          `/api/cv?userId=${user.id}`
        );



        const result = await res.json();



        setData(result);



      }catch(error){


        console.log(
          "CV ERROR",
          error
        );


      }finally{


        setLoading(false);


      }


    };



    getCV();



  },[]);









  const downloadPDF = async()=>{


    try{


      const element =
        document.getElementById("cv");



      if(!element){

        alert(
          "CV tidak ditemukan"
        );

        return;

      }






      const canvas = await html2canvas(
        element,
        {

          scale:2,

          backgroundColor:"#ffffff",

          useCORS:true,


          logging:false

        }
      );







      const imgData =
        canvas.toDataURL(
          "image/png"
        );






      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );






      const pdfWidth =
        pdf.internal.pageSize.getWidth();




      const pdfHeight =
        (
          canvas.height *
          pdfWidth
        )
        /
        canvas.width;






      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );






      pdf.save(
        `CV-${data?.user?.nama || "User"}.pdf`
      );




    }catch(error){


      console.log(
        "PDF ERROR",
        error
      );


      alert(
        "Gagal membuat PDF"
      );


    }


  };









  if(loading){

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        "
      >

        Loading CV...

      </div>

    );

  }









  if(!data){

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        "
      >

        Data CV tidak ditemukan

      </div>

    );

  }









  return (

    <main
      className="
      min-h-screen
      bg-gray-100
      py-10
      "
    >



      <div
        className="
        max-w-5xl
        mx-auto
        "
      >





        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >




          <h1
            className="
            text-3xl
            font-bold
            "
          >

            Buat CV

          </h1>







          <button

            onClick={downloadPDF}

            className="
            bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-blue-800
            transition
            "

          >

            Download PDF

          </button>






        </div>









        <CVPreview
          data={data}
        />






      </div>





    </main>

  );

}