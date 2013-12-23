
<div class="text_cell_render border-box-sizing rendered_html">
<p>Yesterday, I was visiting the <a href="http://www.astro.washington.edu/users/vanderplas/">Jake VanderPlas</a>'s Scientific Python Course <a href="http://www.astro.washington.edu/users/vanderplas/Astr599/schedule">site</a> because of some issues raised at the ipython-dev mailing list (and obviously, because Jake usually do amazing things).</p>
<p>To build his site, Jake wrote an <strong>Hyde</strong> plugin to render <em>ipynb</em> files to static html files using the <code>IPython.convert</code> platform. You can see an example of the final rendered document <a href="http://www.astro.washington.edu/users/vanderplas/Astr599/notebooks/01_basic_training">here</a>.</p>
<p>When I saw the final document, I wondered if we could have hidden output cells which automatically get visible after a click over the input cell... and then, I made some experiments using the power of the <code>IPython.nbconvert</code> library ;-) <!-- TEASER_END --></p>
<p><strong>NOTE: From here, to see the output of each cell, please click on the input area and surprise yourself!</strong></p>
<p>First, we needed to rewrite some things at the <strong>Jinja</strong> template level:</p>
</div>
<div class="cell border-box-sizing code_cell vbox">
<div class="input hbox">
<div class="prompt input_prompt">
In&nbsp;[1]:
</div>
<div class="input_area box-flex1">
<div class="highlight"><pre><span class="o">!</span>sed -n 1,7p /media/datos/Ejemplos/toggle.tpl
</pre></div>

<i class="icon-hand-up icon-large" style="float:right; margin-top:8px; margin-right:10px">&nbsp;&nbsp;Click me!</i>
</div>
</div>

<div class="output_hidden">

<div class="vbox output_wrapper">
<div class="output vbox">


<div class="hbox output_area"><div class="prompt"></div>
<div class="box-flex1 output_subarea output_stream output_stdout">
<pre>
{%- extends &apos;html_full.tpl&apos; -%}

{% block output_group %}
&lt;div class=&quot;output_hidden&quot;&gt;
{{ super() }}
&lt;/div&gt;
{% endblock output_group %}

</pre>
</div>
</div>

</div>
</div>

</div>

</div>
<div class="text_cell_render border-box-sizing rendered_html">
<p>We had to <em>rewrite</em> the <code>output_group</code> block to encompass it with a new <code>output_hidden</code>-classed <code>div</code>, which we would use in a simple <strong>Javascript</strong> function later.</p>
<p>Second, we needed to write that little <strong>Javascript</strong> snippet:</p>
</div>
<div class="cell border-box-sizing code_cell vbox">
<div class="input hbox">
<div class="prompt input_prompt">
In&nbsp;[2]:
</div>
<div class="input_area box-flex1">
<div class="highlight"><pre><span class="o">!</span>sed -n 25,29p /media/datos/Ejemplos/toggle.tpl
</pre></div>

<i class="icon-hand-up icon-large" style="float:right; margin-top:8px; margin-right:10px">&nbsp;&nbsp;Click me!</i>
</div>
</div>

<div class="output_hidden">

<div class="vbox output_wrapper">
<div class="output vbox">


<div class="hbox output_area"><div class="prompt"></div>
<div class="box-flex1 output_subarea output_stream output_stdout">
<pre>
$(document).ready(function(){
  $(&quot;.input&quot;).click(function(){
      $(this).next(&apos;.output_hidden&apos;).slideToggle();
  });
})

</pre>
</div>
</div>

</div>
</div>

</div>

</div>
<div class="text_cell_render border-box-sizing rendered_html">
<p>Here, we used the <code>.slideToggle()</code> method to display or hide the <code>output_hidden</code>-classed <code>div</code> elements (with a nice sliding motion) when the user makes a click on the input cells. We was using <strong>jQuery</strong>, so we needed to load <strong>jQquery</strong>, ie. using the following line:</p>
<p><code>&lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js&quot;&gt;&lt;/script&gt;</code></p>
<p>Finally, we added some css to make the <code>output_hidden-classed div</code> not visible (hidden by default):</p>
</div>
<div class="cell border-box-sizing code_cell vbox">
<div class="input hbox">
<div class="prompt input_prompt">
In&nbsp;[3]:
</div>
<div class="input_area box-flex1">
<div class="highlight"><pre><span class="o">!</span>sed -n 18,21p /media/datos/Ejemplos/toggle.tpl
</pre></div>

<i class="icon-hand-up icon-large" style="float:right; margin-top:8px; margin-right:10px">&nbsp;&nbsp;Click me!</i>
</div>
</div>

<div class="output_hidden">

<div class="vbox output_wrapper">
<div class="output vbox">


<div class="hbox output_area"><div class="prompt"></div>
<div class="box-flex1 output_subarea output_stream output_stdout">
<pre>
.output_hidden {
  display: none;
  margin-top: 5px;
}

</pre>
</div>
</div>

</div>
</div>

</div>

</div>
<div class="text_cell_render border-box-sizing rendered_html">
<p>If you put all these snippets together, you will get the following template:</p>
</div>
<div class="cell border-box-sizing code_cell vbox">
<div class="input hbox">
<div class="prompt input_prompt">
In&nbsp;[4]:
</div>
<div class="input_area box-flex1">
<div class="highlight"><pre><span class="o">!</span>cat -n /media/datos/Ejemplos/toggle.tpl
</pre></div>

<i class="icon-hand-up icon-large" style="float:right; margin-top:8px; margin-right:10px">&nbsp;&nbsp;Click me!</i>
</div>
</div>

<div class="output_hidden">

<div class="vbox output_wrapper">
<div class="output vbox">


<div class="hbox output_area"><div class="prompt"></div>
<div class="box-flex1 output_subarea output_stream output_stdout">
<pre>
     1	{%- extends &apos;html_full.tpl&apos; -%}
     2	
     3	{% block output_group %}
     4	&lt;div class=&quot;output_hidden&quot;&gt;
     5	{{ super() }}
     6	&lt;/div&gt;
     7	{% endblock output_group %}
     8	
     9	{%- block header -%}
    10	{{ super() }}
    11	
    12	&lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js&quot;&gt;&lt;/script&gt;
    13	
    14	&lt;style type=&quot;text/css&quot;&gt;
    15	div.output_wrapper {
    16	  margin-top: 0px;
    17	}
    18	.output_hidden {
    19	  display: none;
    20	  margin-top: 5px;
    21	}
    22	&lt;/style&gt;
    23	
    24	&lt;script&gt;
    25	$(document).ready(function(){
    26	  $(&quot;.input&quot;).click(function(){
    27	      $(this).next(&apos;.output_hidden&apos;).slideToggle();
    28	  });
    29	})
    30	&lt;/script&gt;
    31	{%- endblock header -%}
    32	

</pre>
</div>
</div>

</div>
</div>

</div>

</div>
<div class="text_cell_render border-box-sizing rendered_html">
<p>To use it, just add <code>--template toggle</code> to your <code>ipython nbconvert</code> call, ie:</p>
<p><code>ipython nbconvert your_notebook.ipynb --to html --template toggle --post serve</code></p>
<p>or add the <code>toggle.tpl</code> file to you <strong>IPython</strong> nbconvert config file.</p>
<p>If you are reading this line, you probably have already experienced the demo in this post (btw, I like to do demos explaining the tools with the tools themselves).</p>
<p>Obviously, I quickly implemented this functionality inside <strong>Nikola</strong> and, as a consequence, in <strong>Nikola</strong> master, you now have the possibility to pass an <strong>IPython</strong> config <code>dict</code> to your <strong>Nikola</strong> <code>conf.py</code> file, making the <em>ipynb</em> plugin for <strong>Nikola</strong> more powerful than before ;-)</p>
<p>To conclude, the possibility to mimic the <strong>IPython</strong> notebook execution is very useful for introductory courses and to publish content in a shorter but more interactive way.</p>
<p>Hope you enjoy it!</p>
<p>Damián</p>
</div>