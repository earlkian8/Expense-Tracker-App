import profileImage from './../../image/profile.jpg'

const About = () => {
 return (
          <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={profileImage} alt="Profile" className='rounded-full' />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built by <span className="font-extrabold text-gray-900">Earl Kian</span></h2>
            <div className="flex justify-center space-x-4">
              <a href="https://portfolio-earlkian.vercel.app/" target="_blank" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer">
                View Portfolio
              </a>
              <a href="https://www.linkedin.com/in/earl-kian-bancayrin-213858354" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
 );
}

export default About 