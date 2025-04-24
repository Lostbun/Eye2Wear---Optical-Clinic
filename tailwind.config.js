


export default {
   content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./index.html",
   ],


   theme: {
    extend: {

      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
        slideOut: 'slideOut 0.3s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.3s ease-out forwards',
        fadeoutUp: 'fadeoutUp 0.3s ease-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        spin: 'spin 1s linear infinite'
      },


      fontSize: {
              'fluid': 'clamp(14px, 4vw, 18px)',
      },

      keyframes: {




        slideIn: {

          '0%' : {
            transform: 'translateX(-20px)',
            width: '0',
            opacity: '0',
          },
          '100%' : {
            transform: 'translateX(0px)',
            width: '100%',
            opacity: '1',
          },
        },



        slideOut: {

          '0%' : {
            transform: 'translateX(0px)',
            width: '100%',
            opacity: '1',
          },
          '100%' : {
            transform: 'translateX(-20px)',
            width: '0',
            opacity: '0',
          }
        },





        
        fadeInDown: {

          '0%' : {
            transform: 'translateY(-20px)',
            opacity: '0',
          },
          '100%' : {
            transform: 'translateY(0px)',
            opacity: '1',
          }
        },


        fadeoutUp: {

          '0%' : {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%' : {
            transform: 'translateY(-20px)',
            opacity: '1',
          }
        },


       fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      
        


      },


      


    }
   },

   plugins: [], 
}


