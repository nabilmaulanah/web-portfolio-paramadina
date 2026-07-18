"use client";

interface Props {
  data:any;
}


export default function CVPreview({
  data
}:Props){


  if(!data) return null;


  const {
    user,
    profile,
    projects,
    skills,
    certificates,
    experiences
  } = data;



  return (

    <div
      id="cv"
      style={{
        backgroundColor:"#ffffff",
        width:"794px",
        minHeight:"1123px",
        margin:"auto",
        display:"flex",
        boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
      }}
    >


      {/* LEFT */}

      <div
        style={{
          width:"260px",
          backgroundColor:"#111827",
          color:"#ffffff",
          padding:"32px"
        }}
      >



        <div
          style={{
            display:"flex",
            justifyContent:"center",
            marginBottom:"24px"
          }}
        >

          <img
            src={
              profile?.foto ||
              "/default-profile.png"
            }

            style={{
              width:"128px",
              height:"128px",
              borderRadius:"50%",
              objectFit:"cover",
              border:"4px solid white"
            }}
          />

        </div>





        <h3
          style={{
            fontSize:"18px",
            fontWeight:"bold",
            marginBottom:"16px"
          }}
        >
          Contact
        </h3>


        <p style={{fontSize:"14px",marginBottom:"8px"}}>
          {user.email}
        </p>


        <p style={{fontSize:"14px",marginBottom:"8px"}}>
          {profile?.no_hp}
        </p>


        <p style={{fontSize:"14px"}}>
          {profile?.alamat}
        </p>







        <h3
          style={{
            fontSize:"18px",
            fontWeight:"bold",
            marginTop:"32px",
            marginBottom:"16px"
          }}
        >
          Skills
        </h3>



        {
          skills?.map((item:any)=>(

            <div
              key={item.id}
              style={{
                backgroundColor:"rgba(255,255,255,0.2)",
                borderRadius:"8px",
                padding:"8px 12px",
                fontSize:"14px",
                marginBottom:"8px"
              }}
            >

              {item.nama_skill}

            </div>

          ))
        }







        <h3
          style={{
            fontSize:"18px",
            fontWeight:"bold",
            marginTop:"32px",
            marginBottom:"16px"
          }}
        >
          Certificate
        </h3>



        {
          certificates?.map((item:any)=>(

            <p
              key={item.id}
              style={{
                fontSize:"14px",
                marginBottom:"8px"
              }}
            >

              {item.title}

            </p>

          ))
        }



      </div>








      {/* RIGHT */}


      <div
        style={{
          flex:1,
          padding:"40px"
        }}
      >



        <h1
          style={{
            fontSize:"36px",
            fontWeight:"bold"
          }}
        >

          {user.nama}

        </h1>




        <p
          style={{
            fontSize:"20px",
            color:"#1D4ED8",
            marginTop:"8px"
          }}
        >

          {user.prodi}

        </p>







        <Section title="About Me">

          <p
            style={{
              color:"#4B5563",
              lineHeight:"1.8"
            }}
          >

            {
              profile?.bio ||
              "Belum ada deskripsi."
            }

          </p>


        </Section>







        <Section title="Experience">


        {
          experiences?.map((item:any)=>(


            <div
              key={item.id}
              style={{
                marginBottom:"20px"
              }}
            >


              <h3
                style={{
                  fontWeight:"bold",
                  fontSize:"18px"
                }}
              >

                {item.jabatan}

              </h3>



              <p
                style={{
                  color:"#1D4ED8"
                }}
              >

                {item.organisasi}

              </p>



              <p
                style={{
                  color:"#6B7280",
                  fontSize:"14px"
                }}
              >

                {
                  new Date(
                    item.startDate
                  )
                  .toLocaleDateString(
                    "id-ID",
                    {
                      month:"short",
                      year:"numeric"
                    }
                  )
                }

                {" - "}

                {
                  item.endDate
                  ?
                  new Date(
                    item.endDate
                  )
                  .toLocaleDateString(
                    "id-ID",
                    {
                      month:"short",
                      year:"numeric"
                    }
                  )
                  :
                  "Sekarang"
                }


              </p>



              <p
                style={{
                  marginTop:"8px",
                  color:"#4B5563"
                }}
              >

                {item.description}

              </p>


            </div>


          ))
        }


        </Section>









        <Section title="Project">


        {
          projects?.map((item:any)=>(

            <div
              key={item.id}
              style={{
                marginBottom:"16px"
              }}
            >

              <h3
                style={{
                  fontWeight:"bold"
                }}
              >

                {item.title}

              </h3>


              <p
                style={{
                  color:"#4B5563",
                  fontSize:"14px"
                }}
              >

                {item.description}

              </p>


            </div>


          ))
        }


        </Section>



      </div>



    </div>


  );

}







function Section({
  title,
  children
}:{
  title:string;
  children:React.ReactNode;
}){


  return (

    <section
      style={{
        marginTop:"32px"
      }}
    >


      <h2
        style={{
          fontSize:"24px",
          fontWeight:"bold",
          borderBottom:"1px solid #ddd",
          paddingBottom:"8px",
          marginBottom:"16px"
        }}
      >

        {title}

      </h2>


      {children}


    </section>

  );

}