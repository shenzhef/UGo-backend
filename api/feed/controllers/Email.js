"use strict";

module.exports = {
  async index(ctx) {
    console.log("entra");
    await strapi.plugins["email"].services.email.send({
      to: "martin.miauro@gmail.com",
      from: "martin.miauro@gmail.com",
      replyTo: "no-reply@example.com",
      subject: "Use strapi email provider successfully",
      html: `
      
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <!--<![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {width: 600px;margin: 0 auto;}
          table {border-collapse: collapse;}
          table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
          img {-ms-interpolation-mode: bicubic;}
        </style>
      <![endif]-->
            <style type="text/css">
          body, p, div {
            font-family: tahoma,geneva,sans-serif;
            font-size: 14px;
          }
          body {
            color: #000000;
          }
          body a {
            color: #1188E6;
            text-decoration: none;
          }
          p { margin: 0; padding: 0; }
          table.wrapper {
            width:100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          img.max-width {
            max-width: 100% !important;
          }
          .column.of-2 {
            width: 50%;
          }
          .column.of-3 {
            width: 33.333%;
          }
          .column.of-4 {
            width: 25%;
          }
          ul ul ul ul  {
            list-style-type: disc !important;
          }
          ol ol {
            list-style-type: lower-roman !important;
          }
          ol ol ol {
            list-style-type: lower-latin !important;
          }
          ol ol ol ol {
            list-style-type: decimal !important;
          }
          @media screen and (max-width:480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
              text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
              text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
              font-size: 80% !important;
              padding: 5px 0;
            }
            table.wrapper-mobile {
              width: 100% !important;
              table-layout: fixed;
            }
            img.max-width {
              height: auto !important;
              max-width: 100% !important;
            }
            a.bulletproof-button {
              display: block !important;
              width: auto !important;
              font-size: 80%;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .columns {
              width: 100% !important;
            }
            .column {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .social-icon-column {
              display: inline-block !important;
            }
          }
        </style>
            <!--user entered Head Start--><link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"><style>
        html {
          font-family: 'Montserrat', sans-serif;
        }
      </style><!--End Head user entered-->
          </head>
          <body>
            <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:tahoma,geneva,sans-serif; color:#000000; background-color:#FFFFFF;">
              <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                  <tr>
                    <td valign="top" bgcolor="#FFFFFF" width="100%">
                      <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="100%">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td>
                                  <!--[if mso]>
          <center>
          <table><tr><td width="600">
        <![endif]-->
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                            <tr>
                                              <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
          <tr>
            <td role="module-content">
              <p>test</p>
            </td>
          </tr>
        </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:10px 10px 0px 10px;" bgcolor="#F4B5CD" data-distribution="1">
          <tbody>
            <tr role="module-content">
              <td height="100%" valign="top"><table width="556" style="width:556px; border-spacing:0; border-collapse:collapse; margin:0px 12px 0px 12px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
            <tbody>
              <tr>
                <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1ab4500a-2ce2-4947-bc4d-5d5e47b7c231">
          <tbody>
            <tr>
              <td style="font-size:6px; line-height:10px; padding:15px 0px 0px 0px;" valign="top" align="left">
                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:15% !important; width:15%; height:auto !important;" width="83" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/acd75e5bb98342a1/758fb5f0-bcb2-4b17-9eae-fedc5ba42fc4/120x40.png">
              </td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e547a7e9-6c60-4479-9e93-55a6a1a459d6" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: Montserrat; text-align: inherit"><span style="font-size: 20px; line-height: 28px; color: #ffffff"><strong>Último paso! Confirmá tu mail</strong></span></div>
      <div style="font-family: Montserrat; text-align: inherit"><br></div>
      <div style="font-family: Montserrat; text-align: inherit"><span style="color: #ffffff">Tocá el botón de aquí abajo para poder verificar tu cuenta e ingresar a la app.</span></div>
      <div style="font-family: Montserrat; text-align: inherit"><br></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="593d99da-ec00-462e-8247-276326b92064">
            <tbody>
              <tr>
                <td align="left" bgcolor="" class="outer-td" style="padding:0px 0px 18px 0px;">
                  <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                    <tbody>
                      <tr>
                      <td align="center" bgcolor="#ffffff" class="inner-td" style="border-radius:6px; font-size:16px; text-align:left; background-color:inherit;">
                        <a href="" style="background-color:#ffffff; border:1px solid #ffffff; border-color:#ffffff; border-radius:6px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Verificar cuenta</a>
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table></td>
              </tr>
            </tbody>
          </table></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ca685afd-15e8-47d7-b2c5-d4055c09c29a">
          <tbody>
            <tr>
              <td height="100%" valign="top" role="module-content"><div style="height:15px;border-radius:20px;background-color:#F4B5CD;margin-top:-20px"></div></td>
            </tr>
          </tbody>
        </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 10px 17px 10px;" bgcolor="#231F20" data-distribution="1">
          <tbody>
            <tr role="module-content">
              <td height="100%" valign="top"><table width="556" style="width:556px; border-spacing:0; border-collapse:collapse; margin:0px 12px 0px 12px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
            <tbody>
              <tr>
                <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d183e621-5393-42e8-9335-51f0b7cd4e67" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:20px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: Montserrat; text-align: inherit"><span style="color: #ffffff">Para cualquier duda, ponete en contacto con nosotros a través de soporte@ugo.com.ar</span></div>
      <div style="font-family: inherit; text-align: inherit"><br></div>
      <div style="font-family: Montserrat; text-align: inherit"><span style="color: #ffffff">Te llegó este mail por equivocación? Avisanos</span></div>
      <div style="font-family: inherit; text-align: inherit"><br></div>
      <div style="font-family: inherit; text-align: inherit"><br></div><div></div></div></td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="870822e2-b488-425f-b808-98c23d2cfb4e">
          <tbody>
            <tr>
              <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 1px 0px;" bgcolor="#ffffff"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7e739271-fe28-4748-9a37-ed9f45d198f1">
          <tbody>
            <tr>
              <td style="font-size:6px; line-height:10px; padding:25px 0px 25px 0px;" valign="top" align="center">
                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:20% !important; width:20%; height:auto !important;" width="NaN" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/acd75e5bb98342a1/4fae76ab-88ad-45f4-bef2-bd0e923e4d13/120x39.png">
              </td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="34a83d13-193f-4af6-824b-82332702d1e8">
          <tbody>
            <tr>
              <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 1px 0px;" bgcolor="#ffffff"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="66dcfafc-f2de-4c5a-8621-0c2d98347e83" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: Montserrat; text-align: center"><span style="font-size: 20px; font-family: Montserrat; line-height: 28px; color: #f4f4f4"><strong>Hasta el próximo paseo!</strong></span></div><div></div></div></td>
            </tr>
          </tbody>
        </table></td>
              </tr>
            </tbody>
          </table></td>
            </tr>
          </tbody>
        </table></td>
                                            </tr>
                                          </table>
                                          <!--[if mso]>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                  <![endif]-->
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>
      `,
      // templateId: "d-f0c3bb03e9ac46708396083f1bb7c84d",
    });
    // return ctx.send(
    //   `
    //   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    //   <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    //       <head>
    //         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    //         <!--[if !mso]><!-->
    //         <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    //         <!--<![endif]-->
    //         <!--[if (gte mso 9)|(IE)]>
    //         <xml>
    //           <o:OfficeDocumentSettings>
    //             <o:AllowPNG/>
    //             <o:PixelsPerInch>96</o:PixelsPerInch>
    //           </o:OfficeDocumentSettings>
    //         </xml>
    //         <![endif]-->
    //         <!--[if (gte mso 9)|(IE)]>
    //     <style type="text/css">
    //       body {width: 600px;margin: 0 auto;}
    //       table {border-collapse: collapse;}
    //       table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    //       img {-ms-interpolation-mode: bicubic;}
    //     </style>
    //   <![endif]-->
    //         <style type="text/css">
    //       body, p, div {
    //         font-family: tahoma,geneva,sans-serif;
    //         font-size: 14px;
    //       }
    //       body {
    //         color: #000000;
    //       }
    //       body a {
    //         color: #1188E6;
    //         text-decoration: none;
    //       }
    //       p { margin: 0; padding: 0; }
    //       table.wrapper {
    //         width:100% !important;
    //         table-layout: fixed;
    //         -webkit-font-smoothing: antialiased;
    //         -webkit-text-size-adjust: 100%;
    //         -moz-text-size-adjust: 100%;
    //         -ms-text-size-adjust: 100%;
    //       }
    //       img.max-width {
    //         max-width: 100% !important;
    //       }
    //       .column.of-2 {
    //         width: 50%;
    //       }
    //       .column.of-3 {
    //         width: 33.333%;
    //       }
    //       .column.of-4 {
    //         width: 25%;
    //       }
    //       ul ul ul ul  {
    //         list-style-type: disc !important;
    //       }
    //       ol ol {
    //         list-style-type: lower-roman !important;
    //       }
    //       ol ol ol {
    //         list-style-type: lower-latin !important;
    //       }
    //       ol ol ol ol {
    //         list-style-type: decimal !important;
    //       }
    //       @media screen and (max-width:480px) {
    //         .preheader .rightColumnContent,
    //         .footer .rightColumnContent {
    //           text-align: left !important;
    //         }
    //         .preheader .rightColumnContent div,
    //         .preheader .rightColumnContent span,
    //         .footer .rightColumnContent div,
    //         .footer .rightColumnContent span {
    //           text-align: left !important;
    //         }
    //         .preheader .rightColumnContent,
    //         .preheader .leftColumnContent {
    //           font-size: 80% !important;
    //           padding: 5px 0;
    //         }
    //         table.wrapper-mobile {
    //           width: 100% !important;
    //           table-layout: fixed;
    //         }
    //         img.max-width {
    //           height: auto !important;
    //           max-width: 100% !important;
    //         }
    //         a.bulletproof-button {
    //           display: block !important;
    //           width: auto !important;
    //           font-size: 80%;
    //           padding-left: 0 !important;
    //           padding-right: 0 !important;
    //         }
    //         .columns {
    //           width: 100% !important;
    //         }
    //         .column {
    //           display: block !important;
    //           width: 100% !important;
    //           padding-left: 0 !important;
    //           padding-right: 0 !important;
    //           margin-left: 0 !important;
    //           margin-right: 0 !important;
    //         }
    //         .social-icon-column {
    //           display: inline-block !important;
    //         }
    //       }
    //     </style>
    //         <!--user entered Head Start--><link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"><style>
    //     html {
    //       font-family: 'Montserrat', sans-serif;
    //     }
    //   </style><!--End Head user entered-->
    //       </head>
    //       <body>
    //         <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:tahoma,geneva,sans-serif; color:#000000; background-color:#FFFFFF;">
    //           <div class="webkit">
    //             <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
    //               <tr>
    //                 <td valign="top" bgcolor="#FFFFFF" width="100%">
    //                   <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
    //                     <tr>
    //                       <td width="100%">
    //                         <table width="100%" cellpadding="0" cellspacing="0" border="0">
    //                           <tr>
    //                             <td>
    //                               <!--[if mso]>
    //       <center>
    //       <table><tr><td width="600">
    //     <![endif]-->
    //                                       <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
    //                                         <tr>
    //                                           <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    //       <tr>
    //         <td role="module-content">
    //           <p>test</p>
    //         </td>
    //       </tr>
    //     </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:10px 10px 0px 10px;" bgcolor="#F4B5CD" data-distribution="1">
    //       <tbody>
    //         <tr role="module-content">
    //           <td height="100%" valign="top"><table width="556" style="width:556px; border-spacing:0; border-collapse:collapse; margin:0px 12px 0px 12px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
    //         <tbody>
    //           <tr>
    //             <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1ab4500a-2ce2-4947-bc4d-5d5e47b7c231">
    //       <tbody>
    //         <tr>
    //           <td style="font-size:6px; line-height:10px; padding:15px 0px 0px 0px;" valign="top" align="left">
    //             <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:15% !important; width:15%; height:auto !important;" width="83" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/acd75e5bb98342a1/758fb5f0-bcb2-4b17-9eae-fedc5ba42fc4/120x40.png">
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e547a7e9-6c60-4479-9e93-55a6a1a459d6" data-mc-module-version="2019-10-22">
    //       <tbody>
    //         <tr>
    //           <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: Montserrat; text-align: inherit"><span style="font-size: 20px; line-height: 28px; color: #ffffff"><strong>Último paso! Confirmá tu mail</strong></span></div>
    //   <div style="font-family: Montserrat; text-align: inherit"><br></div>
    //   <div style="font-family: Montserrat; text-align: inherit"><span style="color: #ffffff">Tocá el botón de aquí abajo para poder verificar tu cuenta e ingresar a la app.</span></div>
    //   <div style="font-family: Montserrat; text-align: inherit"><br></div><div></div></div></td>
    //         </tr>
    //       </tbody>
    //     </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="593d99da-ec00-462e-8247-276326b92064">
    //         <tbody>
    //           <tr>
    //             <td align="left" bgcolor="" class="outer-td" style="padding:0px 0px 18px 0px;">
    //               <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
    //                 <tbody>
    //                   <tr>
    //                   <td align="center" bgcolor="#ffffff" class="inner-td" style="border-radius:6px; font-size:16px; text-align:left; background-color:inherit;">
    //                     <a href="" style="background-color:#ffffff; border:1px solid #ffffff; border-color:#ffffff; border-radius:6px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Verificar cuenta</a>
    //                   </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table></td>
    //           </tr>
    //         </tbody>
    //       </table></td>
    //         </tr>
    //       </tbody>
    //     </table><table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ca685afd-15e8-47d7-b2c5-d4055c09c29a">
    //       <tbody>
    //         <tr>
    //           <td height="100%" valign="top" role="module-content"><div style="height:15px;border-radius:20px;background-color:#F4B5CD;margin-top:-20px"></div></td>
    //         </tr>
    //       </tbody>
    //     </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 10px 17px 10px;" bgcolor="#231F20" data-distribution="1">
    //       <tbody>
    //         <tr role="module-content">
    //           <td height="100%" valign="top"><table width="556" style="width:556px; border-spacing:0; border-collapse:collapse; margin:0px 12px 0px 12px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
    //         <tbody>
    //           <tr>
    //             <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d183e621-5393-42e8-9335-51f0b7cd4e67" data-mc-module-version="2019-10-22">
    //       <tbody>
    //         <tr>
    //           <td style="padding:20px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: Montserrat; text-align: inherit"><span style="color: #ffffff">Para cualquier duda, ponete en contacto con nosotros a través de soporte@ugo.com.ar</span></div>
    //   <div style="font-family: inherit; text-align: inherit"><br></div>
    //   <div style="font-family: Montserrat; text-align: inherit"><span style="color: #ffffff">Te llegó este mail por equivocación? Avisanos</span></div>
    //   <div style="font-family: inherit; text-align: inherit"><br></div>
    //   <div style="font-family: inherit; text-align: inherit"><br></div><div></div></div></td>
    //         </tr>
    //       </tbody>
    //     </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="870822e2-b488-425f-b808-98c23d2cfb4e">
    //       <tbody>
    //         <tr>
    //           <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
    //             <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
    //               <tbody>
    //                 <tr>
    //                   <td style="padding:0px 0px 1px 0px;" bgcolor="#ffffff"></td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7e739271-fe28-4748-9a37-ed9f45d198f1">
    //       <tbody>
    //         <tr>
    //           <td style="font-size:6px; line-height:10px; padding:25px 0px 25px 0px;" valign="top" align="center">
    //             <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:20% !important; width:20%; height:auto !important;" width="NaN" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/acd75e5bb98342a1/4fae76ab-88ad-45f4-bef2-bd0e923e4d13/120x39.png">
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="34a83d13-193f-4af6-824b-82332702d1e8">
    //       <tbody>
    //         <tr>
    //           <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
    //             <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
    //               <tbody>
    //                 <tr>
    //                   <td style="padding:0px 0px 1px 0px;" bgcolor="#ffffff"></td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="66dcfafc-f2de-4c5a-8621-0c2d98347e83" data-mc-module-version="2019-10-22">
    //       <tbody>
    //         <tr>
    //           <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: Montserrat; text-align: center"><span style="font-size: 20px; font-family: Montserrat; line-height: 28px; color: #f4f4f4"><strong>Hasta el próximo paseo!</strong></span></div><div></div></div></td>
    //         </tr>
    //       </tbody>
    //     </table></td>
    //           </tr>
    //         </tbody>
    //       </table></td>
    //         </tr>
    //       </tbody>
    //     </table></td>
    //                                         </tr>
    //                                       </table>
    //                                       <!--[if mso]>
    //                                     </td>
    //                                   </tr>
    //                                 </table>
    //                               </center>
    //                               <![endif]-->
    //                             </td>
    //                           </tr>
    //                         </table>
    //                       </td>
    //                     </tr>
    //                   </table>
    //                 </td>
    //               </tr>
    //             </table>
    //           </div>
    //         </center>
    //       </body>
    //     </html>
    //   `
    // );
  },
};
