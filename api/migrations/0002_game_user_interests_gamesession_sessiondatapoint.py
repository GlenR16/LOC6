# Generated by Django 5.0.3 on 2024-03-09 07:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('description', models.TextField(verbose_name='Description')),
                ('tags', models.CharField(default='', max_length=255, verbose_name='Tags')),
                ('url', models.URLField(verbose_name='URL')),
                ('image', models.ImageField(blank=True, null=True, upload_to='games', verbose_name='Image')),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='interests',
            field=models.TextField(default='', verbose_name='Interests'),
        ),
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game_sessions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SessionDataPoint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active_time', models.FloatField(verbose_name='Active Time')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='data_points', to='api.game')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='data_points', to='api.gamesession')),
            ],
        ),
    ]