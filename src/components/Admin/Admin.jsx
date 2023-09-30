import styles from './styles.module.css'
//
import AdminNavbar from '../AdminNavbar'
import AdminDashboard from '../AdminDashboard'
import Section from '../ui_components/wrappers/Section.jsx'
import SectionFluid from '../ui_components/wrappers/SectionFluid.jsx'
import Content from '../ui_components/wrappers/Content.jsx'
import Row from '../ui_components/wrappers/Row.jsx'
import Col from '../ui_components/wrappers/Col.jsx'
import Logo from '../ui_components/logo/Logo.jsx'
import Button from '../ui_components/buttons/Button.jsx'



export default function Admin()
{
    return(
        <>
            <SectionFluid>
                <Row mods='align-items-center p-5'>
                    <Col mods={'col-4'}>
                        <Button to='/'>
                            Back to Home Page
                        </Button>
                    </Col>

                    <Col mods='col-4 text-center'>
                        <span className='display-6 fw-medium text-dark-blue'>
                            <Logo dark mods="me-7"/>
                            Admin
                        </span>
                    </Col>
                </Row>
            </SectionFluid>

            <p id='myp'>TEXT</p>
            <button onClick={async function(){
                const response = await fetch('https://travel-w-dashboard.netlify.app/.netlify/functions/index.js').then(
                    (response) => response.json()
                ).catch(
                    (data) => console.log(data)
                )


                // const myp = document.querySelector('#myp')
                // console.log(response)
                // myp.innerText = response.message
            }}>Click me please</button>
            <AdminDashboard/>
        </>
    )
}
