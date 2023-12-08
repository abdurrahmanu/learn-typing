export function quotes() {
    const data = [
        "The only true wisdom is in knowing you know nothing.",

        "In the end, we will remember not the words of our enemies, but the silence of our friends.",

        "The only way to do great work is to love what you do.",

        "The unexamined life is not worth living.",

        "The only thing necessary for the triumph of evil is for good men to do nothing.",

        "Knowing yourself is the beginning of all wisdom.",

        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",

        "It does not matter how slowly you go as long as you do not stop.",

        "The greatest glory in living lies not in never falling, but in rising every time we fall.",

        "The only limit to our realization of tomorrow will be our doubts of today.",

        "The journey of a thousand miles begins with one step.",

        "You miss 100% of the shots you don't take.",

        "In three words I can sum up everything I've learned about life: it goes on.",

        "It is during our darkest moments that we must focus to see the light.",

        "The only person you are destined to become is the person you decide to be.",

        "Don't judge each day by the harvest you reap but by the seeds that you plant.",

        "Life is really simple, but we insist on making it complicated.",

        "Happiness is not something ready made. It comes from your own actions.",

        "The mind is everything. What you think you become.",

        "The future depends on what you do today.",

        "Life is 10% what happens to us and 90% how we react to it.",

        "Success is not final, failure is not fatal: It is the courage to continue that counts.",

        "Don't watch the clock; do what it does. Keep going.",

        "Success is walking from failure to failure with no loss of enthusiasm.",

        "If you're going through hell, keep going.",

        "The greatest wealth is to live content with little.",

        "I have not failed. I've just found 10,000 ways that won't work.",

        "The best revenge is to be unlike him who performed the injury.",

        "The function of education is to teach one to think intensively and to think critically. Intelligence plus character  that is the goal of true education.",

        "No one can make you feel inferior without your consent.",

        "The only thing we have to fear is fear itself.",

        "The greatest discovery of any generation is that a human can alter his life by altering his attitude.",

        "Life is a shipwreck, but we must not forget to sing in the lifeboats.",

        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",

        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",

        "The only way to do great work is to love what you do.",

        "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",

        "The secret of getting ahead is getting started.",

        "Our greatest glory is not in never falling, but in rising every time we fall.",

        "To live is the rarest thing in the world. Most people exist, that is all.",

        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",

        "The only thing standing between you and your dream is the will to try and the belief that it is actually possible.",

        "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",

        "It always seems impossible until it is done.",

        "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.",

        "I attribute my success to this: I never gave or took any excuse.",

        "I am not a product of my circumstances. I am a product of my decisions.",

        "Believe you can and you're halfway there.",

        "The future depends on what you do today.",

        "The only person you should try to be better than is the person you were yesterday.",

        "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",

        "In the end, we will remember not the words of our enemies, but the silence of our friends.",

        "The only way to achieve the impossible is to believe it is possible.",

        "Everything you can imagine is real.",

        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",

        "Success is not in what you have, but who you are.",

        "Life is really simple, but we insist on making it complicated.",

        "It is not the mountain we conquer, but ourselves.",

        "The true sign of intelligence is not knowledge but imagination.",

        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",

        "All that we see or seem is but a dream within a dream.",

        "Do not anticipate trouble, or worry about what may never happen. Keep in the sunlight.",

        "Keep your face always toward the sunshine  and shadows will fall behind you.",

        "The future belongs to those who believe in the beauty of their dreams.",

        "Success is liking yourself, liking what you do, and liking how you do it.",

        "Success is not final, failure is not fatal: It is the courage to continue that counts. ",

        "Don't count the days, make the days count",

        "Life isn't about getting and having, it's about giving and being.",

        "Whatever the mind of man can conceive and believe, it can achieve.",

        "Strive not to be a success, but rather to be of value.",

        "Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.",

        "I attribute my success to this I never gave or took any excuse.",

        "You miss 100% of the shots you don't take.",

        "The most difficult thing is the decision to act, the rest is merely tenacity.",

        "Every strike brings me closer to the next home run.",

        "Definiteness of purpose is the starting point of all achievement.",

        "We must balance conspicuous consumption with conscious capitalism.",

        "Life is what happens to you while you're busy making other plans.",

        "We become what we think about.",

        "Life is 10% what happens to me and 90% of how I react to it.",

        "The most common way people give up their power is by thinking they don't have any.",

        "The mind is everything. What you think you become.",

        "The best time to plant a tree was 20 years ago. The second best time is now.",

        "An unexamined life is not worth living.",

        "Eighty percent of success is showing up.",

        "Your time is limited, so don't waste it living someone else's life.",

        "Winning isn't everything, but wanting to win is.",

        "I am not a product of my circumstances. I am a product of my decisions.",

        "Every child is an artist. The problem is how to remain an artist once he grows up.",

        "You can never cross the ocean until you have the courage to lose sight of the shore.",

        "Either you run the day, or the day runs you.",

        "Whether you think you can or you think you can't, you're right.",

        "The two most important days in your life are the day you are born and the day you find out why.",

        "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.",

        "The best revenge is massive success.",

        "People often say that motivation doesn't last. Well, neither does bathing. That's why we recommend it daily.",

        "Life shrinks or expands in proportion to one's courage.",

        "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.",

        "There is only one way to avoid criticism do nothing, say nothing, and be nothing.",

        "Ask and it will be given to you, search, and you will find, knock and the door will be opened for you.",

        "The only person you are destined to become is the person you decide to be.",

        "Go confidently in the direction of your dreams. Live the life you have imagined.",

        "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.",

        "Certain things catch your eye, but pursue only those that capture the heart.",

        "Believe you can and you're halfway there.",

        "Everything you've ever wanted is on the other side of fear.",

        "We can easily forgive a child who is afraid of the dark, the real tragedy of life is when men are afraid of the light.",

        "Teach thy tongue to say, 'I do not know,' and thous shalt progress.",

        "Start where you are. Use what you have. Do what you can.",

        "Fall seven times and stand up eight.",

        "Everything has beauty, but not everyone can see.",

        "How wonderful it is that nobody need wait a single moment before starting to improve the world.",

        "When I let go of what I am, I become what I might be.",

        "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",

        "Happiness is not something readymade. It comes from your own actions.",

        "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",

        "If the wind will not serve, take to the oars.",

        "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",

        "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",

        "Too many of us are not living our dreams because we are living our fears.",

        "Challenges are what make life interesting and overcoming them is what makes life meaningful.",

        "If you want to lift yourself up, lift up someone else.",

        "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",

        "You take your life in your own hands, and what happens? A terrible thing, no one to blame.",

        "I didn't fail the test. I just found 100 ways to do it wrong.",

        "In order to succeed, your desire for success should be greater than your fear of failure.",

        "A person who never made a mistake never tried anything new.",

        "The person who says it cannot be done should not interrupt the person who is doing it.",

        "There are no traffic jams along the extra mile.",

        "It is never too late to be what you might have been.",

        "You become what you believe.",

        "I would rather die of passion than of boredom.",

        "A truly rich man is one whose children run into his arms when his hands are empty.",

        "If you want your children to turn out well, spend twice as much time with them, and half as much money.",

        "Build your own dreams, or someone else will hire you to build theirs.",

        "Education costs money. But then so does ignorance.",

        "I have learned over the years that when one's mind is made up, this diminishes fear.",

        "It does not matter how slowly you go as long as you do not stop.",

        "Remember that not getting what you want is sometimes a wonderful stroke of luck.",

        "You can't use up creativity. The more you use, the more you have.",

        "Dream big and dare to fail.",

        "Our lives begin to end the day we become silent about things that matter.",

        "Do what you can, where you are, with what you have.",

        "If you do what you've always done, you'll get what you've always gotten.",

        "Dreaming, after all, is a form of planning.",

        "It's your place in the world, it's your life. Go on and do all you can with it, and make it the life you want to live.",

        "You may be disappointed if you fail, but you are doomed if you don't try.",

        "Remember no one can make you feel inferior without your consent.",

        "Life is what we make it, always has been, always will be.",

        "The question isn't who is going to let me, it's who is going to stop me.",

        "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",

        "It's not the years in your life that count. It's the life in your years.",

        "Change your thoughts and you change your world.",

        "Either write something worth reading or do something worth writing.",

        "Nothing is impossible, the word itself says, I'm possible!",

        "The only way to do great work is to love what you do.",

        "If you can dream it, you can achieve it."
    ];
    
    return { data }
}