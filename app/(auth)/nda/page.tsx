'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Document, Packer, Paragraph, Spacing, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const Main = () => {
  const navigate = useRouter();
  const [developerData, setDeveloperData] = useState({
    name: '',
    birthday: '',
    city: '',
    state: '',
    country: '',
    signature: '',
  });

  const [inputData, setInputData] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const signatureRef = useRef(null);
  const pdfRef = useRef(null);

  // Check session data when the component mounts
  const [session, setSession] = useState(localStorage.getItem('session'));
  useEffect(() => {
    if (!session) {
      navigate.push('/');
    }
  }, [navigate]);
  useEffect(() => {
    if (!session) {
      navigate.push('/');
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeveloperData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
const handlelogout=()=>{
  localStorage.removeItem('session');
  setSession(null);
}
  const validateForm = () => {
    const errors: string[] = [];
    
    // Validate required fields
    if (!developerData.name) errors.push('Name is required.');
    if (!developerData.city) errors.push('City is required.');
    if (!developerData.state) errors.push('State is required.');
    if (!developerData.country) errors.push('Country is required.');
    if (!developerData.signature) errors.push('Signature is required.');
    
    // Set validation errors
    setValidationErrors(errors);
    
    return errors.length === 0; // If no errors, return true
};

const handleGenerateDocx = () => {
    // First, validate the form data
    if (!validateForm()) {
        // If validation fails, stop the process
        alert('Please fill out all required fields.');
        return;
    }
    
    // Generate content for the Word document
    const doc = new Document({
        sections: [
        {
          properties: {},
          children: [
              // Heading
              new Paragraph({
                  children: [
                      new TextRun({
                          text: 'Hiring Agreement',
                          font: 'Brush Script Std',
                          size: 24,
                        }),
                    ],
                }),
                new Paragraph({
                children: [new TextRun(``)],
            }),
            new Paragraph({
                children: [new TextRun('Definition')],
                }),
                
                // Main content
            new Paragraph({
                children: [
                    new TextRun(
                        `This hiring agreement (“Agreement”) is made between Business Entity known as ________ having its principal place of business at City of ___, State of ____  (“Employer”) and `
                    ),
                    new TextRun({
                        text: `${developerData.name}`,
                    }),
                new TextRun(' at City of '),
                new TextRun({
                    text: `${developerData.city}`,
                }),
                new TextRun(' , State of '),
                new TextRun({
                    text: `${developerData.state}`,
                }),
                new TextRun(', '),
                new TextRun({
                    text: `${developerData.country}`,
                }),
                new TextRun(
                    ' (“Employee”). WHEREAS the Employer intends to hire the Developer for the position of ______ and the Developer desires to provide their services on the conditions set forth.'
                ),
            ],
        }),
        
            new Paragraph({
              children: [new TextRun('I. Developer Duties.')],
            }),
            new Paragraph({
                children: [new TextRun('II. Responsibilities.')],
            }),

            new Paragraph({
                children: [
                    new TextRun(
                        `The Developer shall be given the job title of ________ (“Position”) which shall involve: ______.`
                    ),
                    new TextRun(' The Employer may also assign duties to the Developer from time to time by the Employer.'),
                ],
            }),
            
            new Paragraph({
            children: [new TextRun(``)],
        }),
            // Personal Data (Name, Birthday, Location)
            new Paragraph({
                children: [new TextRun(`Name: ${developerData.name}`)],
            }),
            new Paragraph({
                children: [new TextRun(`Birthday: ${developerData.birthday}`)],
            }),
            new Paragraph({
                children: [
                    new TextRun(`Location: ${developerData.city}, ${developerData.state}, ${developerData.country}`),
                ],
            }),
            
            new Paragraph({
                children: [new TextRun(`Signature:`)],
            }),
            // Signature field (italic)
            new Paragraph({
                children: [
                    new TextRun({
                        text: ` ${developerData.signature}`,
                  font: 'Brush Script MT',
                  italic: true,
                  size: 40,
                }),
            ],
            }),
          ],
        },
      ],
    });

    // Generate the document and save it as a `.docx` file
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'hiring-agreement.docx');
    });
  };
  
  if(session)return (
    <div className='flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip'>
    {/* <Header/> */}
    <div
      style={{
        zIndex: 3,
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        top: 0,
        left: 0,
        paddingTop: '4rem',
        paddingLeft: '5rem',
        paddingRight: '5rem',
      }}
    >
      <div ref={pdfRef} style={{ justifyItems: 'center', width: '100%' }}>
        <div>
            <div style={{display:'flex', justifyContent:"space-around"}}>

          <h1
            style={{
              fontFamily: 'Brush Script Std, cursive',
              fontSize: '2rem',
            }}
          >
            Hiring Agreement
          </h1>
          <div><button onClick={handlelogout} className="btn-sm font-bold bg-red-500 shadow hover:bg-gray-50">Logout</button></div>
            </div>
          <hr />
          <br />
          <p>Definition</p>
          <div>
            This hiring agreement (“Agreement”) is made between Business Entity known as ________
            having its principal place of business at City of ___, State of ____  (“Employer”) and{' '}
            {inputData ? (
              <span>{developerData.name} </span>
            ) : (
              <input
                style={{
                  padding: 0,
                  height: '18px',
                  fontSize: '1.2rem',
                  fontFamily: 'ui-monospace',
                  width: '142px',
                }}
                name="name"
                value={developerData.name}
                onChange={handleInputChange}
                placeholder="Developer's name"
              />
            )}
            at City of {inputData ? (
              <span>{developerData.city}</span>
            ) : (
              <input
                style={{
                  padding: 0,
                  height: '18px',
                  fontSize: '1.2rem',
                  fontFamily: 'ui-monospace',
                  width: '112px',
                }}
                name="city"
                value={developerData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            )}
            , State of {inputData ? (
              <span>{developerData.state}</span>
            ) : (
              <input
                style={{
                  padding: 0,
                  height: '18px',
                  fontSize: '1.2rem',
                  fontFamily: 'ui-monospace',
                  width: '112px',
                }}
                name="state"
                value={developerData.state}
                onChange={handleInputChange}
                placeholder="State"
              />
            )}
            , {inputData ? (
              <span>{developerData.country}</span>
            ) : (
              <input
                style={{
                  padding: 0,
                  height: '18px',
                  fontSize: '1.2rem',
                  fontFamily: 'ui-monospace',
                  width: '112px',
                }}
                name="country"
                value={developerData.country}
                onChange={handleInputChange}
                placeholder="Country"
              />
            )}
            (“Employee”). WHEREAS the Employer intends to hire the Developer for the position of
            ______ and the Developer desires to provide their services on the conditions set forth.
          </div>
          <br />
          <p>I. Developer Duties.</p>
          <br />
          <p>II. Responsibilities.</p>
          <div>
            The Developer shall be given the job title of ________
            (“Position”) which shall involve: ______.
            The Employer may also assign duties to the Developer from time to time by the Employer.
          </div>

          <div style={{ padding: '1rem' }}>
            <div
              style={{
                padding: '1rem',
                border: 'solid 1px black',
                borderRadius: '4px',
                width: '24rem',
              }}
            >
              <div>
                <span> Name : </span>
                {developerData.name ? <span>{developerData.name}</span> : <span>Name</span>}
                <div>
                  <span> Birthday : </span>
                  {inputData ? (
                    <span>{developerData.birthday}</span>
                  ) : (
                    <input
                      style={{
                        padding: 0,
                        height: '18px',
                        fontSize: '1.2rem',
                        fontFamily: 'ui-monospace',
                      }}
                      name="birthday"
                      type="date"
                      value={developerData.birthday}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
                <div>
                  <span>Location : </span>
                  {developerData.city ? <span>{developerData.city}</span> : <span>City</span>} of{' '}
                  {developerData.state ? <span>{developerData.state}</span> : <span>State</span>},
                  {developerData.country ? <span>{developerData.country}</span> : <span>Country</span>}
                </div>
              </div>
              <br />
              <div
                style={{
                  padding: '.2rem',
                  border: 'solid 1px black',
                  borderRadius: '4px',
                  width: '280px',
                }}
              >
                <input
                  value={developerData.signature}
                  name="signature"
                  style={{
                    fontFamily: 'Brush Script MT, Brush Script Std, cursive',
                    fontStyle: 'italic',
                    width: '100%',
                    padding: '.2rem',
                    fontSize: '3rem',
                  }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="btn-sm font-bold bg-green-500 shadow hover:bg-gray-50" onClick={handleGenerateDocx} style={{ marginTop: '3rem' }}>
          Create Document
        </button>
        {validationErrors.length > 0 && (
          <div style={{ color: 'red', marginTop: '20px' }}>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  );
};

export default Main;
