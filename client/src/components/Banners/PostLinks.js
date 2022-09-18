import React, { useState } from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FBlogo from '../../images/FBlogo.jpg';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import GP from '../../images/GP.png'
import DOC from '../../images/DOC.jpg'
import OSOF from '../../images/OSOF.png'
import nzctlogo from '../../images/nzctlogo.png'
import WWF from '../../images/WWF.jpg'

// This is an animated banner that will display image links to several environmental agencies/companies and 
//NGO's based in /new Zealand
//They are:
// The department of conservation, Forest and Bird, Our Seas Our Future, the WWF, GreenPeace, and the NZ conservation trust
//The animated banner is a library import from  rc-banner-anim:
//https://motion.ant.design/components/banner-anim

const PostLinks = () => {
  const classes = useStyles();
  const BgElement = Element.BgElement;


  return (
    <Container style={{padding:'50px'}}>
         <Paper style={{padding:'30px', backgroundColor: '#E9F7EF'}}>

        <Typography variant="h6" color='primary'>Want to do more to help the Environment?</Typography>

        <Grid container spacing={2} alignContent='centre'>

            <Grid item xs={12} md={12}>
            <BannerAnim prefixCls="banner-user" autoPlay style={{height: '200px'}}>


                    <Element prefixCls="banner-user-elem" key="0">

                        <BgElement key="bg" className="bg" style={{background: '#FFFFFF', height: '100%'}}>
                        <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}  >

                        <Container style={{padding:'2%'}}>
                        <a href="https://www.greenpeace.org/aotearoa/" target="_blank" rel="noreferrer">
                        <img src={GP} alt="GreenPeace" height="100%" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                            </a>
                        </Container>
                        </TweenOne>

                        </BgElement>

                    </Element>



                    <Element prefixCls="banner-user-elem" key="1">

                        <BgElement key="bg" className="bg" style={{background: '#FFFFFF', height: '100%'}}>
                                
                            <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}  >

                                <Container style={{padding:'2%'}}>
                                    <a href="https://www.doc.govt.nz/" target="_blank" rel="noreferrer">
                                        <img src={DOC} alt="DOC" height="100%" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </a>
                                </Container>

                            </TweenOne>

                        </BgElement>

                    </Element>



                    <Element prefixCls="banner-user-elem" key="2">

                        <BgElement key="bg" className="bg" style={{background: '#FFFFFF', height: '100%'}}>

                            <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}  >

                            <Container style={{padding:'2%'}}>
                                <a href="https://www.forestandbird.org.nz/" target="_blank" rel="noreferrer">
                                     <img src={FBlogo} alt="ForestandBird" height="200px" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                </a>
                            </Container>

                            </TweenOne>

                        </BgElement>

                    </Element>


                    <Element prefixCls="banner-user-elem" key="3">

                        <BgElement key="bg" className="bg" style={{background: '#FFFFFF', height: '100%'}}>
                        <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}  >

                            <Container style={{padding:'2%'}}>
                                <a href="https://www.osof.org/" target="_blank" rel="noreferrer">
                                 <img src={OSOF} alt="osof" height="200px" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                </a>
                            </Container>
                        </TweenOne>

                        </BgElement>

                    </Element>

                    <Element prefixCls="banner-user-elem" key="4">

                        <BgElement key="bg" className="bg" style={{background: '#FFFFFF', height: '100%'}}>
                            <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}  >

                                <Container style={{padding:'2%'}}>
                                    <a href="https://www.nzconservationtrust.org.nz/" target="_blank" rel="noreferrer">
                                    <img src={nzctlogo} alt="nzct" height="170px" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                        </a>
                                </Container>
                            </TweenOne>

                        </BgElement>

                    </Element>



                    <Element prefixCls="banner-user-elem" key="5">

                        <BgElement key="bg" className="bg" style={{background: '#FFFFFF', height: '100%'}}>
                            <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}  >

                                <Container style={{padding:'2%'}}>
                                <a href="https://www.wwf.org.nz/" target="_blank" rel="noreferrer">
                                <img src={WWF} alt="WWF" height="200px" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </a>
                                </Container>
                            </TweenOne>

                        </BgElement>

                    </Element>




                </BannerAnim>

            </Grid>

        </Grid>

        </Paper>
      
    </Container>
  );
};

export default PostLinks;
