import React from 'react';
import './Section.css';

export default function Category(props) {

    const {handleCategory} = props;

    const Categories = [
        {value:0,label:'Any Category'},
        {value:9,label:'General Knowledge'},
        {value:10,label:'Entertainment: Books'},
        {value:11,label:'Entertainment: Film'},
        {value:12,label:'Entertainment: Music'},
        {value:13,label:'Entertainment: Musicals & Theaters'},
        {value:14,label:'Entertainment: Television'},
        {value:15,label:'Entertainment: Video Games'},
        {value:16,label:'Entertainment: Board Games'},
        {value:17,label:'Science & Nature'},
        {value:18,label:'Science: Computers'},
        {value:19,label:'Science: Mathematics'},
        {value:20,label:'Mythology'},
        {value:21,label:'Sports'},
        {value:22,label:'Geography'},
        {value:23,label:'History'},
        {value:24,label:'Politics'},
        {value:25,label:'Art'},
        {value:26,label:'Celebrities'},
        {value:27,label:'Animals'},
        {value:28,label:'Vehicles'},
        {value:29,label:'Entertainment: Comics'},
        {value:30,label:'Science: Gadgets'},
        {value:31,label:'Entertainment: Japanese Anime & Manga'},
        {value:32,label:'Entertainment: Cartoon & Animations'}
    ]


    return (
        <div>
            <select
              className="select-css"
              onChange={handleCategory}
              style={{ margin: "1rem 1rem" }}
            >
              <option defaultValue>Choose category</option>
              {Categories.map((category,index) => (
                <option key={index} data-key={category.value} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
        </div>
    )
}
