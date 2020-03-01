

#### Name Zahra Ahmadi
#### Date: 02/28/2020
#### Professor: Pippin Barr
#### Project 2 - “Something is wrong on the Internet”
\
According to my understanding, the most important issue the author intends to point out in “Something is wrong on the Internet” essay is that, the minds and souls of children are at risk against free media such as YouTube. He himself is from a generation who had a binding relationship with internet. But what worries him are the kids whose mental health is currently endangered due to the lack of parents control on programs and media contents like YouTube. Contents which although at first looks useful and safe for kids, as it goes further it gets more harmful and dangerous for them.

Inspired by this essay, I programmed “Who am I” game. This is a game for kids who have just started to learn animals’ names. In the game screen, there is a pile of cards which on one side of the cards is animals’ self-descriptions and on the other side their images. 

The first issue that many may not notice, is the way this game is played. It is both insulting and has harmful effects on kids’ minds. The player should guess the animal name by reading its self-description and let the computer knows their answer by saying “I am a (animal’s name)”.  Addressing yourself as an animal at first glance may not be offensive, but in essence it is. Indeed, after playing this game for a while, the child will have no problem if someone calls or names him with animals’ names. At the same time, they will not shy away from calling others or their friends using animals’ names and it will totally sound normal to them.

Second factor which can harm the player mentally, would be scary images which I imbedded among cartoon photos of animals that neither the parent nor the kid expects. I deliberately chose black background so that nothing other than the image attracts  kid attention. In fact, after short period of playing this game, the kid either gets used to seeing terrible images of animals and even may start to look for more. Or, on the contrary, they might be scared to the level where they will never approach a real animal. Therefore, this game is apparently designed for kids and has educational purposes, but in fact it is not.

The third feature of this game is that the player will never win, even if they succeed to guess more than five animals as wanted in the game instruction. I didn’t add a winning screen intentionally to implement the idea of “Something is wrong on the Internet”.

Two of the other components of “who am I?” game are the timer and score counter. I added a red color timer for two reasons. First, the game will have a framework. Second, it makes the player rushes, loses his/her concentration and thereby, misses the game. However, I added the green score counter to fight against the timer and encourage the player keep guessing. 

One of main challenges to program this game was making the cards pile. To prevent repeating codes like, having several arrays or variables for animals’ images or self-descriptions, I should come up with an appropriate method. I decided to define one array of animal’s names and use that in various parts of my code. One of the main parts that I used this array is where I needed to insert animals’ images. Thanks to this array, I could define only one variable for all of my images rather than defining several single variables, assigning images to and then using them one by one in my code.

The other challenge I faced with was that I wanted the game displays random images, every time the player reloads or restarts the game. To solve this problem, I found a function called “Jquery.grep()” which removes exactly the element that you want from the array.

Annyang and Responsive voice are two of the libraries that I used alongside the jQuery library. I used Annyang so the player can answer questions orally. I think the game impression on the kid would be more if they actually repeat the “I am a (animal name)” sentence every time. And I used Responsive voice for the warnings, so the player won’t lose her/his time for reading the warnings.

Finally, I have a “Play again” button in my game over screen which let the player play again if they liked.









[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
