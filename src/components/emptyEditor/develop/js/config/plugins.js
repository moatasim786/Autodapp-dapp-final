 export function linkBlock(editor){
      editor.DomComponents.addType('content-link', {
            extend: 'link',
            model: {
                defaults: {
	            editable: true,
	            droppable: true,
                    style: {
                        display: 'inline-block',
                        'height': '30px',
                        'width': '30px'
                    },
                    attributes:{href:'http://google.com'}
                }
            }
        });
        
        editor.BlockManager.add('content-link', {
            label:'Content Link',
            category:'Links',
            attributes: { class:'fa fa-link' },
            content:{
                type:'content-link'
            }
        })
  }