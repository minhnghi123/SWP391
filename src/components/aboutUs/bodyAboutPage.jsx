import img1 from '../../assets/vaccine.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function BodyAboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left side - Image */}
                <div className="w-full lg:w-1/2">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-3xl transform translate-x-3 translate-y-3"></div>
                        <img 
                            src={img1} 
                            alt="about" 
                            className="relative rounded-3xl w-full h-[500px] object-cover shadow-xl" 
                        />
                        <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white px-6 py-4 rounded-2xl shadow-lg">
                            <p className="text-2xl font-bold">15+</p>
                            <p className="text-sm">Years Experience</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <div className="space-y-2">
                        <span className="text-blue-500 font-semibold text-sm tracking-wider uppercase 
                            bg-blue-50 px-3 py-1 rounded-full flex items-center gap-2">
                        
                            About Us
                        </span>
                        <h1 className="text-4xl font-bold text-gray-800">
                            We Care About Your 
                            <span className="text-blue-500"> Health</span>
                        </h1>
                    </div>

                    <div className="space-y-4 text-gray-600">
                        <p className="leading-relaxed">
                            Welcome to our state-of-the-art vaccination center, where we prioritize your health 
                            and well-being. With over a decade of experience, our team of medical professionals 
                            is dedicated to providing safe and effective vaccination services.
                        </p>
                        <p className="leading-relaxed">
                            We understand that each patient is unique, which is why we offer personalized 
                            vaccination plans tailored to your specific needs. Our facility is equipped with 
                            the latest medical technology and follows strict safety protocols.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow 
                            duration-300 border border-gray-100">
                            <div className="text-2xl font-bold text-blue-500 mb-1">10k+</div>
                            <div className="text-gray-600">Happy Patients</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow 
                            duration-300 border border-gray-100">
                            <div className="text-2xl font-bold text-blue-500 mb-1">50+</div>
                            <div className="text-gray-600">Expert Doctors</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}