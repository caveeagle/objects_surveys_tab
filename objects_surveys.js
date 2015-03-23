

function INIT_OBJECTS_SURVEYS_TAB()
{
    /* Init date fields */
    document.getElementById("start_objects_date_field").innerHTML = getCurrentYear()+"-01-01";
    document.getElementById("stop_objects_date_field").innerHTML = today();


    metaobj_objects_surveys = new smisMeta({  "NoFlash":1, "debug": 1, "debug_func" : function(msg){	tlog(msg); }, conf: MetaDATA_conf.objects_surveys, loadingHTML: "&nbsp;&nbsp;&nbsp;Обновление ...<br><br>",nodataHTML: "&nbsp;&nbsp;&nbsp;Нет данных<br><br>" });
    metaobj_objects_surveys.renderMakeParams = objects_surveys_makeMetaParams;
    metaobj_objects_surveys.OnMetaUpdate = objects_surveys_OnMetaUpdate;
    metaobj_objects_surveys.OnMetaClick = objects_surveys_OnMetaClick;
    
    
    reload_objects_surveys_parameters()
}

function reload_objects_surveys_parameters()
{

	if(active_tab=="tab_objects_surveys")
	{
		metaobj_objects_surveys.get();
	}	  
    
}

function objects_surveys_makeMetaParams()
{
}

function objects_surveys_OnMetaUpdate()
{
}


function objects_surveys_OnMetaClick()
{
}

function set_objects_date_field()
{
}

