'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { countries } from '../signup/countries';

const Main = () => {


  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const navigate = useRouter();
  const [developerData, setDeveloperData] = useState({
    name: '',
    signdate: '',
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

  const handlelogout = () => {
    localStorage.removeItem('session');
    setSession(null);
  };

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

const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDeveloperData({...developerData, country:event.target.value});
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
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Hiring Agreement',
                  font: 'Brush Script Std',
                  size: 40,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Definition',
                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `This Software Development Non-Disclosure Agreement (the “Agreement”) is entered into by and between _____company name_______,with its principal offices at ________company_location(city of country)______, (“Disclosing Party”) and ${developerData.name}, located at ${developerData.city} of ${developerData.state} state, ${developerData.country} (“Receiving Party”) for the purpose of preventing the unauthorized disclosure of Confidential Information as defined below. The parties agree to enter into a confidential relationship with respect to the disclosure of certain proprietary and confidential information (“Confidential Information”).`,
                  font: 'Brush Script Std',
                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '1. Definition of Confidential Information',
                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }), 
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `For purposes of this Agreement, “Confidential Information” shall include all information or material that has or could have commercial value or other utility in Disclosing Party’s business, and is treated with confidentiality. Such information includes, but is not limited to: unpublished computer code, design definitions and specifications, flow diagrams and flowcharts, formulas and algorithms, system and user documentation, data structures and data compilations, marketing and sales data, customer lists, and pending patent applications. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word “Confidential” or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party shall promptly provide a writing indicating that such oral communication constituted Confidential Information.`,
                  font: 'Brush Script Std',
                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '2. Exclusions from Confidential Information',
                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Receiving Party’s obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party’s representatives; or (d) is disclosed by Receiving Party with Disclosing Party’s prior written approval.`,
                  font: 'Brush Script Std',
                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '3. Obligations of Receiving Party',
                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall carefully restrict access to Confidential Information to employees, contractors and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party shall not, without prior written approval of Disclosing Party, use for Receiving Party’s own benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its possession pertaining to Confidential Information immediately if Disclosing Party requests it in writing.`,
                  font: 'Brush Script Std',
                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '4. Time Periods',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  
                  text: `The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party’s duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first.`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '5. Relationships',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venturer or employee of the other party for any purpose.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '6. Severability',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }), new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `If a court finds any provision of this Agreement invalid or unenforceable, the remainder of this Agreement shall be interpreted so as best to effect the intent of the parties.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '7. Integration',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `This Agreement expresses the complete understanding of the parties with respect to the subject matter and supersedes all prior proposals, agreements, representations and understandings. This Agreement may not be amended except in a writing signed by both parties.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '8. Waiver',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `
The failure to exercise any right provided in this Agreement shall not be a waiver of prior or subsequent rights.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '9. Injunctive Relief',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `Any misappropriation of Confidential Information in violation of this Agreement may cause Disclosing Party irreparable harm, the amount of which may be difficult to ascertain, and therefore Receiving Party agrees that Disclosing Party shall have the right to apply to a court of competent jurisdiction for an order enjoining any such further misappropriation and for such other relief as Disclosing Party deems appropriate. This right of Disclosing Party is to be in addition to the remedies otherwise available to Disclosing Party.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '10. Indemnity',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `Receiving Party agrees to indemnify Disclosing Party against any and all losses, damages, claims or expenses incurred or suffered by Disclosing Party as a result of Receiving Party’s breach of this Agreement.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({

                  text: '11. Attorney Fees and Expenses',


                  font: 'Brush Script Std',
                  size: 33,
                }),
              ],
            }),
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({
              children: [
                new TextRun({


                  text: `In a dispute arising out of or related to this Agreement, the prevailing party shall have the right to collect from the other party its reasonable attorney fees and costs and necessary expenditures.

`,
                  font: 'Brush Script Std',


                  size: 24,
                }),
              ],
            }),
            
            new Paragraph({ children: [new TextRun(``)] }),
            new Paragraph({ children: [new TextRun(`Name: ${developerData.name}`)] }),
            new Paragraph({ children: [new TextRun(`Date of Sign: ${developerData.signdate}`)] }),
            new Paragraph({
              children: [
                new TextRun(`Location: ${developerData.city}, ${developerData.state}, ${developerData.country}`),
              ],
            }),
            new Paragraph({ children: [new TextRun(`Signature:`)] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: ` ${developerData.signature}`,
                  font: 'Brush Script MT',
                  italic: true,
                  size: 50,
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

  if (session)
    return (
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <div
          style={{
            zIndex: 3,
            width: '100%',
            // position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            top: 0,
            left: 0,
            // paddingTop: '4rem', 
            paddingLeft: '5rem',
            paddingRight: '5rem',
          }}
        >
          <div ref={pdfRef} style={{ justifyItems: 'center', width: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <h1
                  style={{
                    fontFamily: 'Brush Script Std, cursive',
                    fontSize: '2rem',
                  }}
                >
                  Hiring Agreement
                </h1>
                <div>
                  <button
                    onClick={handlelogout}
                    className="btn-sm font-bold bg-red-500 shadow hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <hr />
              <br />
              <p>Definition</p>
              <div>

              This Software Development Non-Disclosure Agreement (the “Agreement”) is entered into by and between _____company name_______,with its principal offices at ________company_location(city of country)______, (“Disclosing Party”) and {inputData ? (
                  <span>{developerData.name} </span>
                ) : (
                  <input
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: 'Arial, sans-serif',
                      marginBottom: '0.5rem',
                    }}
                    name="name"
                    value={developerData.name}
                    onChange={handleInputChange}
                    placeholder="Developer's name"
                  />
                )}, located at {inputData ? (
                  <span>{developerData.city}</span>
                ) : (
                  <input
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: 'Arial, sans-serif',
                      marginBottom: '0.5rem',
                    }}
                    name="city"
                    value={developerData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                )}City of
                 {inputData ? (
                  <span>{developerData.state}</span>
                ) : (
                  <input
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: 'Arial, sans-serif',
                      marginBottom: '0.5rem',
                    }}
                    name="state"
                    value={developerData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                )} state 
                , {inputData ? (
                  <span>{developerData.country}</span>
                ) : (
                  
                  <select
              className="form-input  py-2"
              id="country"
              value={developerData.country}
              onChange={handleCountryChange}
            >
              <option value="">Please choose your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
                )} (“Receiving Party”) for the purpose of preventing the unauthorized disclosure of Confidential Information as defined below. The parties agree to enter into a confidential relationship with respect to the disclosure of certain proprietary and confidential information (“Confidential Information”).



              </div>
              <br />
              <p>1.  Definition of Confidential Information</p>
              <br />
              <p>For purposes of this Agreement, “Confidential Information” shall include all information or material that has or could have commercial value or other utility in Disclosing Party’s business, and is treated with confidentiality. Such information includes, but is not limited to: unpublished computer code, design definitions and specifications, flow diagrams and flowcharts, formulas and algorithms, system and user documentation, data structures and data compilations, marketing and sales data, customer lists, and pending patent applications. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word “Confidential” or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party shall promptly provide a writing indicating that such oral communication constituted Confidential Information.
              </p>
              <br/>
              <br/>
              <p>2. Exclusions from Confidential Information
              </p>
              <br/>
              <p>Receiving Party’s obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party’s representatives; or (d) is disclosed by Receiving Party with Disclosing Party’s prior written approval.</p>
                <br/>
                <br/>
              <p>
              3.    Obligations of Receiving Party
              </p>
              <br/>
              <p>
              Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall carefully restrict access to Confidential Information to employees, contractors and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party shall not, without prior written approval of Disclosing Party, use for Receiving Party’s own benefit, publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its possession pertaining to Confidential Information immediately if Disclosing Party requests it in writing.
              </p>  
                <br/>
                <br/>
              <p>
              4.    Time Periods
              </p>
              <br/>
              <p>
              The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party’s duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first.
              </p>  
                <br/>
                <br/>
              <p>
              5.    Relationships
              </p>
              <br/>
              <p>
              Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venturer or employee of the other party for any purpose.
              </p>  
                <br/>
                <br/>
              <p>
              6.    Severability
              </p>
              <br/>
              <p>
              
If a court finds any provision of this Agreement invalid or unenforceable, the remainder of this Agreement shall be interpreted so as best to effect the intent of the parties.
              </p>  
                <br/>
                <br/>
              <p>
              7.    Integration
              </p>
              <br/>
              <p>
              
              This Agreement expresses the complete understanding of the parties with respect to the subject matter and supersedes all prior proposals, agreements, representations and understandings. This Agreement may not be amended except in a writing signed by both parties.
              </p>  
                <br/>
                <br/>
              <p>
              8.    Waiver
              </p>
              <br/>
              <p>
              
              The failure to exercise any right provided in this Agreement shall not be a waiver of prior or subsequent rights.
              </p>  
                <br/>
                <br/>
              <p>
              9.    Injunctive Relief
              </p>
              <br/>
              <p>
              
              Any misappropriation of Confidential Information in violation of this Agreement may cause Disclosing Party irreparable harm, the amount of which may be difficult to ascertain, and therefore Receiving Party agrees that Disclosing Party shall have the right to apply to a court of competent jurisdiction for an order enjoining any such further misappropriation and for such other relief as Disclosing Party deems appropriate. This right of Disclosing Party is to be in addition to the remedies otherwise available to Disclosing Party. </p>  



                <br/>
                <br/>
              <p>
              10.  Indemnity
              </p>
              <br/>
              <p>
              
             
Receiving Party agrees to indemnify Disclosing Party against any and all losses, damages, claims or expenses incurred or suffered by Disclosing Party as a result of Receiving Party’s breach of this Agreement.
               </p>  
                <br/>
                <br/>
              <p>
             
              11.  Attorney Fees and Expenses
              </p>
              <br/>
              <p>
              

              In a dispute arising out of or related to this Agreement, the prevailing party shall have the right to collect from the other party its reasonable attorney fees and costs and necessary expenditures.
               </p>  


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
                      <span> Date of Sign : </span>
                      {inputData ? (
                        <span>{developerData.signdate}</span>
                      ) : (
                        <input
                          style={{
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontFamily: 'Arial, sans-serif',
                            marginBottom: '0.5rem',
                          }}
                          name="signdate"
                          type="date"
                          value={developerData.signdate}
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
                      padding: '.5rem',
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
                        padding: '.5rem',
                        fontSize: '3rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn-sm font-bold bg-green-500 shadow hover:bg-gray-50"
              onClick={handleGenerateDocx}
              style={{ marginTop: '3rem' }}
            >
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
      </div>
    );
};

export default Main;
